export interface IPost {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export type IJsonPost = Omit<IPost, 'userId'>