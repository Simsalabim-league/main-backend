import { tryCatch } from 'fp-ts/TaskEither'

import { Option, Some } from 'fp-ts/lib/Option'
import { IVerifyOptions } from 'passport-local'
import { NextFunction, Request, Response } from 'express'
import { ApiError, IApiError } from './throwApiError'
import { User } from '@src/types/user'

export type DoneeFn = (error: unknown, user?: Option<User>, options?: IVerifyOptions & { status: 'failed'|'done'; }) => void

export type ApiHandler<P = unknown, RSB = unknown, RQB = unknown, RQ = unknown> = (
    req: Request<P, RSB, RQB, RQ> & { user: Some<User>; },
    res: Response<RSB>,
    next: NextFunction
) => Promise<unknown>

export interface ApiErrorResponse {
    message: string;
    details?: string;
}


export const createHandler = <
    ExpressParams extends Record<string, any> | null = null, // Such params as: users/:id -> { id: string }
    ResBody extends Record<string, any> | null = null,
    ReqBody extends Record<string, any> | null = null,
    ReqQuery extends Record<string, any> | null = null, // URI queries
    >(
        handler: ApiHandler<ExpressParams, ResBody, ReqBody, ReqQuery>,
    ): ApiHandler<ExpressParams, ResBody | ApiErrorResponse, ReqBody, ReqQuery> => (
        async (req, res, next) =>
        {
            await tryCatch(
                () => handler(req, res, next),
                (error: IApiError | Error) =>
                {
                    if (error instanceof ApiError)
                        res.status(error.code ?? 500).send({ message: error.message, details: error.details })
                    else
                        res.status(500).send({ message: error.message })
                    if (!(error instanceof ApiError) || error.critical)
                        console.trace(error)
                },
            )()
        }
    )
