import { fold } from 'fp-ts/Either'
import { IApiError, throwApiError } from '@utils/throwApiError'

export const resolveApiError = <T>(onRight: (a: T) => void) => fold<IApiError, T, void>(
    (err) =>
    {
        console.trace(err.message)
        throwApiError(err)
    },
    onRight,
)
