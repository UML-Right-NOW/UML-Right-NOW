export interface IUser {
    _id?: string;
    email: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}