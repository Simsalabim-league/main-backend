import { PassportStatic } from 'passport'
import { ApiHandler, User } from '@src/types'
import { fold, Option } from 'fp-ts/Option'

interface LoginRequest {
    username: string;
    password: string;
}

export const loginHandler: (p: PassportStatic) => ApiHandler<any, LoginRequest, User> = (passport) => (req, res, next) =>
{
    passport.authenticate('local', (err, user: Option<User>, info) =>
    {
        if (err) console.trace(err)
        fold(
            () =>
            {
                res.status(401).send(info)
            },
            (user: User) =>
            {
                req.login(user, (loginError) =>
                {
                    if (loginError) console.trace(loginError)
                    res.send(user)
                })
            },
        )(user)

        next()
    })(req, res, next)
}
