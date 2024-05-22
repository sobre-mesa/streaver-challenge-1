import { IUser } from "./IUser";

export interface IPost {
    id: number;
    title: string;
    body: string;
    userId: number;
    createdAt: Date; 
}

export type IJsonPost = Omit<IPost, 'userId'>

export interface IPostUserAggregate {
    id: number;
    title: string;
    body: string;
    user: IUser;
    createdAt: Date; 
}
