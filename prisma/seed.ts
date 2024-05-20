import { IUser } from '@/types/IUser';
import prisma from '../lib/prisma'
import { IUpsertRequestBody } from '@/types/UpsertRequestBody';
const users = require('./data/users.json');
const posts = require('./data/posts.json');

const mapToUserUpsertObject = (user: IUser): IUpsertRequestBody<IUser> => (
  {
    where: { email: user.email},
    update: {},
    create: user
  }
)

async function main() {
  const response = await Promise.all(
    users.map((user:IUser) => prisma.users.upsert(mapToUserUpsertObject(user)))
  )
  console.log(response)
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
