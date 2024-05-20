import { PostRequestBody } from "./PostRequestBody";

export interface IUpsertRequestBody<T> {
    where: { email: string},
    update: Object,
    create: PostRequestBody<T>
}

