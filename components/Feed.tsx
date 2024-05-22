import { IPostUserAggregate } from "@/types/IPost"

export interface IFeedProps {
    posts: IPostUserAggregate[],
}

export function Feed ({ posts }: IFeedProps) {
  return (
      <ul role="list" className="space-y-6">
        {posts.slice().reverse().map((post) => (
          <li key={post.id} className="relative flex gap-x-4">
            <div className="flex-shrink-0 w-1 h-full border-l-2 border-dotted border-gray-300"></div>
            <div className="flex-auto rounded-lg bg-white p-4 shadow-sm ring-1 ring-inset ring-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{post.user.name}</span> :
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{post.title.toUpperCase()}</h3>
              <p className="text-sm leading-6 text-gray-700">{post.body}</p>
            </div>
          </li>
        ))}
      </ul>
  )
}
