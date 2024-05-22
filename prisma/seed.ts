import { IUser } from '@/types/IUser';
import prisma from '../lib/prisma'
import { IUpsertRequestBody } from '@/types/UpsertRequestBody';
import { IJsonPost, IPost } from '@/types/IPost';
const users = require('./data/users.json');
const posts = require('./data/posts.json');

const mapToPostCreateObject = (post: IJsonPost, userId: number) => (
  {
    data: {...post, userId}
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
    posts.flatMap((post: IPost) => 
      userIds.map((id: number) => 
        prisma.posts.create(mapToPostCreateObject(post, id))
      )
    )
  );
  console.log(postResponse)
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
