import { IPost } from "./IPost";
import { IUser } from "./IUser";

export type PostRequestBody<T> = Omit<T, 'id' | 'createdAt'>;

export type GenericPOSTData =
  | PostRequestBody<IPost>
  | PostRequestBody<IUser>
