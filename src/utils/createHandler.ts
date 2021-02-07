import { ApiError, ApiHandler } from '@src/types/express'
import { tryCatch } from 'fp-ts/Either'
import { ErrorConfig } from './throwApiError'

export const createHandler = <
    P extends Record<string, any> | null = null,
    RQ extends Record<string, any> | null = null,
    RS extends Record<string, any> | null = null,
    >(handler: ApiHandler<P, RQ, RS>): ApiHandler<P, RQ, RS | ApiError> => (
        (req, res, next) =>
        {
            tryCatch(
                () => handler(req, res, next),
                ({ code, message }: ErrorConfig) =>
                {
                    res.status(code ?? 500).send({ message })
                },
            )
        }
    )
