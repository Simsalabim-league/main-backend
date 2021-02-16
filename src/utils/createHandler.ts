import { tryCatch } from 'fp-ts/TaskEither'

import { Some } from 'fp-ts/lib/Option'
import { NextFunction, Request, Response } from 'express'
import { ApiError, IApiError } from './throwApiError'
import { User } from '@src/types/user'

export type ApiHandler<P = unknown, RSB = unknown, RQB = unknown, RQ = unknown> = (
    req: Request<P, RSB, RQB, RQ> & { user: Some<User>; },
    res: Response<RSB>,
    next: NextFunction
) => Promise<unknown>

export interface ApiErrorResponse {
    message: string;
    details?: string;
}

export const errors = (error: Error): IApiError =>
{
    switch (error.message)
    {
    case 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters':
        return {
            message: 'Передан неверный ID',
            code: 400,
            details: error.message,
        }
    default:
        return { message: 'Произошла неизвестная ошибка', details: error.message }
    }
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
                (error: ApiError | Error) =>
                {
                    const apiError = error instanceof ApiError ? error : new ApiError(errors(error))

                    res.status(apiError.code ?? 500).send({ message: apiError.message, details: apiError.details })

                    if (!(error instanceof ApiError) || error.critical)
                        console.trace(error)
                },
            )()
        }
    )
