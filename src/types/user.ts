export type Guild = 'sim'|'zim'
export type Role = 'Админ'|'Офицер'|'Рядовой'

export type LolTier = 'IRON'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'MASTER'
    | 'GRANDMASTER'
    | 'CHALLENGER';
export type LolRank = 'I' | 'II' | 'III' | 'IV'
export interface RankInfo {
    tier: LolTier;
    rank: LolRank;
    points: number;
}

export type Line = 'Топ'|'Лес'|'Мид'|'Адк'|'Саппорт'
export interface RolesDistribution {
    main: Line;
    additional: Array<Line>;
    other: Array<Line>;
}

export interface User
{
    _id: string;

    name: string;
    warnings: number;
    guild: string;
    role: string;
    password: string;
    reputation: number;
    join_date: number;

    vk_name: string;
    vk_link: string;
    vk_id: number;
    vk_photo: string;
    vk_photo_large: string;
    bdate: string | null;
    town: string | null;

    discord_name: string;
    discord_id: string;
    discord_avatar: string;
    discord_avatar_large: string;

    debt: number;
    lol_name: string;
    lol_id: string;
    lol_level: number;
    roles: string;
    lol_profile_icon: string;
    lol_acc_id: string;
    rank_info?: RankInfo;
    distRoles: RolesDistribution;
}
