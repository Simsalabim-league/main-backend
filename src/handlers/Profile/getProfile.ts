import { ObjectId } from 'mongodb'
import { createHandler, once, throwApiError } from '@src/utils'
import { Profile } from '@src/types'
import { createProjection, createProjectionProps } from '@utils/createProjection'
import { connectDB } from '@src/database/connectDB'
import { getUser } from '@utils/getUser'
import { resolveApiError } from '@utils/resolveApiError'

const defaultProjection = once(() => createProjection({ projection: ['password'], type: 'omit' }))

export const getProfile = createHandler<
    { user_id: string; },
    Partial<Profile>,
    null,
    createProjectionProps
>(
    (req, res) => (
        connectDB()
            .then(({ db }) => (
                getUser<Profile>(
                    { _id: new ObjectId(req.params.user_id) },
                    req.query.projection && req.query.type
                        ? createProjection({ projection: req.query.projection, type: req.query.type })
                        : defaultProjection(),
                    db,
                )
            ))
            .then(resolveApiError(
                (profile) =>
                {
                    if (profile === null)
                        throwApiError({ message: 'Нет такого пользователя', code: 404 })
                    else
                        res.send(profile)
                },
            ))
    ),
)
