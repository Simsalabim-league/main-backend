import { Strategy as LocalStrategy } from 'passport-local'
import { none, some } from 'fp-ts/Option'
import { Connection } from '@src/database/connectDB'
import { User, DoneFn } from '@src/types'


export const authenticationStrategy = (db: Connection['db']) => new LocalStrategy(
    (username: string, password: string, done: DoneFn) =>
    {
        db
            .collection('users')
            .findOne({ lol_name: username }, (err, user: User | null) =>
            {
                if (err) return done(err)
                if (user == null) return done(null, none, { status: 'failed', message: 'Неверный логин' })
                if (user.password !== password) return done(null, none, { status: 'failed', message: 'Неверный пароль' })

                return done(null, some(user))
            })
    },
)
