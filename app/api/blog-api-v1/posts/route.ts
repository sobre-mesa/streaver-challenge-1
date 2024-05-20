import prisma from "@/lib/prisma";
import { GenericPOSTParams, genericGetAll, genericPOST } from "../../utils/prismaUtils";
import { PostRequestBody } from "@/types/PostRequestBody";
import { IPost } from "@/types/IPost";

const model = prisma.posts;
const postParams  = (data: PostRequestBody<IPost>) : GenericPOSTParams => (
  {
  model,
  data,
  validationField: "name",
  }
)
export async function POST(req: Request) {
  const data : PostRequestBody<IPost> = await req.json();
  return await genericPOST(postParams(data));
}

export async function GET(req: Request) {
  return genericGetAll(model);
}
