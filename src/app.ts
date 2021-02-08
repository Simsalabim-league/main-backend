require('dotenv').config()

import http from 'http'
import https from 'https'
import fs from 'fs'
import passport from 'passport'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoConnector from 'connect-mongo'
import { v4 as uuid } from 'uuid'

import { connectDB } from '@src/database/connectDB'

import { isAuthorized } from '@middlewares/authentication/checkers'
import { authenticationStrategy } from '@middlewares/authentication/authenticationStrategy'
import { deserializer, serializer } from '@middlewares/authentication/serialization'
import { corsOptions } from '@middlewares/corsProtection'

import { loginHandler } from '@handlers/authorization'
import { sessionUser } from '@handlers/sessionUser'
import { getProfile } from '@handlers/Profile/getProfile'
import { getUsers } from '@handlers/Users/getUsers'


const MongoStore = mongoConnector(session)

const app = express()

const isSecure = process.env.NODE_ENV === 'production'
const privateKey = isSecure ? fs.readFileSync(process.env.KEY_PATH, 'utf8') : null
const certificate = isSecure ? fs.readFileSync(process.env.CRT_PATH, 'utf8') : null
const credentials = { key: privateKey, cert: certificate }

connectDB()
    .then(({ client: clientDB, db }) =>
    {
        /**
         * Passport preparation
         */
        passport.use(authenticationStrategy(db))
        passport.serializeUser(serializer())
        passport.deserializeUser(deserializer(db))

        app.use(session({
            secret: 'simsalabim',
            genid: () => uuid(),
            resave: false,
            saveUninitialized: true,
            store: new MongoStore({
                client: clientDB,
            }),
            cookie: {
                maxAge: 3.154e+10,
                httpOnly: true,
                secure: isSecure,
                sameSite: 'none',
            },
        }))

        if (process.env.NODE_ENV === 'production') app.use(cors(corsOptions))

        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use(passport.session())


        app.post('/login', loginHandler(passport))

        app.get('/session-user', isAuthorized, sessionUser)
        app.get('/profile/:id', isAuthorized, getProfile)
        app.get('/users', isAuthorized, getUsers)


        const server = isSecure
            ? https.createServer(credentials, app)
            : http.createServer(app)
        const port = process.env.APP_PORT ?? 9999
        server.listen(port, () =>
        {
            console.log(`API was started at ${isSecure ? 'https' : 'http'}://localhost:${port}`)
        })
    })
