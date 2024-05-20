import prisma from "@/lib/prisma";
import { GenericPOSTParams, genericGetAll, genericPOST } from "../../utils/prismaUtils";
import { IUser } from "@/types/IUser";
import { PostRequestBody } from "@/types/PostRequestBody";

const model = prisma.users;
const postParams  = (data: PostRequestBody<IUser>) : GenericPOSTParams=> (
  {
  model,
  data,
  validationField: "name",
  }
)

export async function POST(req: Request) {
  const data : PostRequestBody<IUser> = await req.json();
  return await genericPOST(postParams(data));
}

export async function GET(req: Request) {
  return genericGetAll(model);
}
