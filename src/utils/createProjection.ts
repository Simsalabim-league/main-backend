import { filterWithIndex, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { User } from '@src/types'

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
    dist_roles: 1,
    custom_groups: 1,
}

export interface createProjectionProps {
    projection: Array<Partial<keyof Projection>>;
    type: 'omit'|'only';
}
export const createProjection = ({ type, projection }: createProjectionProps): Projection => (
    type === 'omit'
        ? filterWithIndex((field: keyof User) => !projection.includes(field))(fullProjection)
        : projection.reduce((generatedProjection, projectionField) => ({
            ...generatedProjection,
            [projectionField]: 1,
        }), {})
)
