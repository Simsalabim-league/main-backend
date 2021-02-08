import { User } from '@src/types'
import { filterWithIndex, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'

export type FullProjection = ReadonlyRecord<keyof User, 1|0>
export type Projection = Partial<FullProjection>
export const fullProjection: FullProjection = {
    _id: 1,

    name: 1,
    guild: 1,
    role: 1,
    reputation: 1,
    password: 1,
    join_date: 1,

    vk_name: 1,
    vk_link: 1,
    vk_id: 1,
    vk_photo: 1,
    vk_photo_large: 1,
    bdate: 1,
    town: 1,

    discord_name: 1,
    discord_id: 1,
    discord_avatar: 1,
    discord_avatar_large: 1,

    debt: 1,
    lol_name: 1,
    lol_id: 1,
    lol_level: 1,
    roles: 1,
    lol_profile_icon: 1,
    lol_acc_id: 1,
    rank_info: 1,
    distRoles: 1,
}

interface createProjectionProps {
    proj: Array<Partial<keyof Projection>>;
    type: 'omit'|'include';
}
export const createProjection = ({ type, proj }: createProjectionProps): Projection => (
    type === 'omit'
        ? filterWithIndex((field: keyof User) => !proj.includes(field))(fullProjection)
        : proj.reduce((projection, field) => ({ ...projection, [field]: 1 }), {})
)
