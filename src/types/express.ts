import { Option } from 'fp-ts/Option'
import { User } from '@src/types/user'
import { IVerifyOptions } from 'passport-local'
import { Request, Response, NextFunction } from 'express'


export type DoneFn = (error: unknown, user?: Option<User>, options?: IVerifyOptions & { status: 'failed'|'done'; }) => void

export type ApiHandler = <Params = Record<string, unknown>, ReqBody = any, ResBody = any>(
    req: Request<Params, ResBody, ReqBody> & { user: User; },
    res: Response<ResBody>,
    next: NextFunction
) => unknown
