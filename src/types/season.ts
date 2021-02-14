export interface Season {
    _id: string;
    user_id: string;

    season_title: string;
    first_step: number;
    second_step: number;
    games: number;
    reputation: number;
}
