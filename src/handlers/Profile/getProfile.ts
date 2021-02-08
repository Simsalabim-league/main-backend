import { createHandler, IApiError, once, throwApiError } from '@src/utils'
import { Profile, User } from '@src/types'
import { createProjection } from '@utils/createProjection'
import { connectDB } from '@src/database/connectDB'
import { getUser } from '@utils/getUser'
import { ObjectId } from 'mongodb'
import { Either, fold, tryCatch } from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import { resolveApiError } from '@utils/resolveApiError'

const defaultProjection = once(() => createProjection({ proj: ['password'], type: 'omit' }))

export const getProfile = createHandler<
    { id: string; },
    null,
    Partial<Profile>,
    { projection?: Array<Partial<keyof User>>; }
>(
    async (req, res) =>
    {
        const projection = req.query.projection ? createProjection({ proj: req.query.projection, type: 'include' }) : defaultProjection()
        const { db } = await connectDB()

        const profile = await tryCatch<IApiError, Promise<Either<Error, Profile>>>(
            () => getUser<Profile>({ _id: new ObjectId(req.params.id) }, projection, db),
            (error: Error) => error.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
                ? { message: 'Передан неверный ID', code: 400, details: error.message }
                : { message: 'Произошла неизвестная ошибка', details: error.message },
        )

        await pipe(
            profile,
            fold(
                (err) => throwApiError(err),
                async profile =>
                {
                    pipe(
                        await profile,
                        resolveApiError(
                            (profile) =>
                            {
                                if (profile === null)
                                    throwApiError({ message: 'Нет такого пользователя', code: 404 })
                                else
                                    res.send(profile)
                            },
                        ),
                    )
                },
            ),
        )
    },
)
