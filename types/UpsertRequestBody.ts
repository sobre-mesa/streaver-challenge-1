import { PostRequestBody } from "./PostRequestBody";

export interface IUpsertRequestBody<T> {
    where: { email: string } | { id: number } ,
    update: Object,
    create: PostRequestBody<T>
}

