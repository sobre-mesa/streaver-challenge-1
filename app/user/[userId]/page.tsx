import { Suspense } from 'react';
import { Feed } from "@/components/Feed";
import { FriendsList } from "@/components/Friendslist";
import { Header } from "@/components/Header";
import prisma from "@/lib/prisma";
import { Loading } from "@/components/Loading";
import Link from "next/link";

export const metadata = {
  title: 'Home Page',
  description: 'This is the home page',
};

async function getData(userId: number) {
  const posts = await prisma.posts.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const friends = await prisma.users.findMany();

  return { posts, friends };
}

interface HomeProps {
  params: {
    userId: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const userId = parseInt(params.userId, 10);
  const { posts, friends } = await getData(userId);
  const me = friends.pop();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header name={me?.name} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 max-w-2xl mx-auto p-4">
          <Suspense fallback={<Loading />}>
            <Feed posts={posts} />
          </Suspense>
        </div>
        <div className="w-full lg:w-1/3">
          <Suspense fallback={<Loading />}>
            <FriendsList
              friends={friends}
              currentSelectedUser={userId}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
