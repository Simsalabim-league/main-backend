import { createHandler, once } from '@src/utils'
import { createProjection } from '@utils/createProjection'
import { TableUser } from '@src/types'
import { connectDB } from '@src/database/connectDB'

const defaultProjection = once(() => createProjection({
    projection: [
        'name',
        'password',
        'vk_id',
        'vk_photo_large',
        'bdate',
        'town',
        'discord_id',
        'discord_avatar_large',
        'lol_id',
        'lol_acc_id',
        'custom_groups',
    ],
    type: 'omit',
}))

export const getUsers = createHandler<
    { id: string; },
    Array<TableUser>
>((req, res) => (
    connectDB()
        .then(
            ({ db }) => db.collection('users').find<TableUser>({}, { projection: defaultProjection() }).toArray(),
        )
        .then(res.send.bind(res))
))
