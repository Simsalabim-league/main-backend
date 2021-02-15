import { PassportStatic } from 'passport'
import { fold, Option } from 'fp-ts/Option'
import { User } from '@src/types'
import { ApiHandler } from '@src/utils'

interface LoginRequest {
    username: string;
    password: string;
}

export const loginHandler: (p: PassportStatic) => ApiHandler<null, User, LoginRequest> = (
    passport,
) => async (
    req,
    res,
    next,
) =>
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
