import { Option, Some } from 'fp-ts/lib/Option'
import { User } from '@src/types/user'
import { IVerifyOptions } from 'passport-local'
import { NextFunction, Request, Response } from 'express'

export type DoneFn = (error: unknown, user?: Option<User>, options?: IVerifyOptions & { status: 'failed'|'done'; }) => void

export type ApiHandler<
    Params extends Record<string, any> | null = null,
    ReqBody extends Record<string, any> | null = null,
    ResBody extends Record<string, any> | null = null,
    ReqQuery extends Record<string, any> | null = null,
    > = (
    req: Request<Params, ResBody, ReqBody, ReqQuery> & { user: Some<User>; },
    res: Response<ResBody>,
    next: NextFunction
) => Promise<unknown>

export interface ApiErrorResponse {
    message: string;
    details?: string;
}
