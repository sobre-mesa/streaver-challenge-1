import { IUser } from '@/types/IUser';
import prisma from '../lib/prisma'
import { IUpsertRequestBody } from '@/types/UpsertRequestBody';
import { IJsonPost, IPost } from '@/types/IPost';
import { genericGetAll } from '@/app/api/utils/prismaUtils';
const users = require('./data/users.json');
const posts = require('./data/posts.json');
const mapToPostUpsertObject = (post: IJsonPost, userId: number): IUpsertRequestBody<IPost> => (
  {
    where: {id: post.id},
    update: {},
    create: {...post, userId}
  }
)
const mapToUserUpsertObject = (user: IUser): IUpsertRequestBody<IUser> => (
  {
    where: { email: user.email},
    update: {},
    create: user
  }
)

async function main() {
  const userResponse = await Promise.all(
    users.map((user:IUser) => prisma.users.upsert(mapToUserUpsertObject(user)))
  )
  console.log(userResponse)
  const userIds = [1,2,3,4,5,6,7,8,9,10]
  const postResponse = await Promise.all(
    posts.reduce(
      (post: IPost, acc: IUpsertRequestBody<IPost>[])=> {
        return [...acc, ...userIds.map((id: number) => mapToPostUpsertObject(post, id))]
      }
    ,[])
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
