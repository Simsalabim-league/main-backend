require('dotenv').config()

import http from 'http'
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


const MongoStore = mongoConnector(session)

const app = express()

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
                //secure: protocol === 'https',
                sameSite: 'none',
            },
        }))

        if (process.env.NODE_ENV === 'production') app.use(cors(corsOptions))

        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use(passport.session())

        app.post('/login', loginHandler(passport))

        app.get('/user', isAuthorized)

        const server = http.createServer(app)
        const port = process.env.APP_PORT ?? 9999
        server.listen(port, () =>
        {
            console.log(`API was started at http://localhost:${port}`)
        })
    })
