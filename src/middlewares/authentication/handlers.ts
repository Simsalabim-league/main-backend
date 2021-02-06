import { PassportStatic } from 'passport'
import { ApiHandler } from '@src/types/express'

export const loginHandler: (p: PassportStatic) => ApiHandler = (passport) => (req, res, next) =>
{
    passport.authenticate('local', (err, user, info) =>
    {
        console.log(user)
        // if (err) console.log(err)
        // if (!user)
        // {
        //     return res.status(401).send(info)
        // }
        // req.login(user, (loginError) =>
        // {
        //     if (loginError) console.log(loginError)
        //     res.send({ status: 'done', message: JSON.stringify(user) })
        // })
        next()
    })(req, res, next)
}
