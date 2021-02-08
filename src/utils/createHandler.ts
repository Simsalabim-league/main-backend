import { ApiErrorResponse, ApiHandler } from '@src/types/express'
import { tryCatch } from 'fp-ts/TaskEither'
import { ApiError, IApiError } from './throwApiError'

export const createHandler = <
    P extends Record<string, any> | null = null,
    RQB extends Record<string, any> | null = null,
    RSB extends Record<string, any> | null = null,
    RQQ extends Record<string, any> | null = null,
    >(handler: ApiHandler<P, RQB, RSB, RQQ>): ApiHandler<P, RQB, RSB | ApiErrorResponse, RQQ> => (
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
                },
            )()
        }
    )
