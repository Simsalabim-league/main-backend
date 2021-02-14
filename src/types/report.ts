export interface Report {
    _id: string;
    target: string;
    witness: string;

    description: string;
    anonymously: boolean;
    deleted: boolean;
    onlyAdmin: boolean;
}
