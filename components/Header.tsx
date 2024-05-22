import Link from "next/link";

interface IHeaderProps {
    name: string | undefined;
    inGeneralFeed?: boolean
    inPersonalFeed?: boolean
}
export const Header = ({name, inGeneralFeed, inPersonalFeed}: IHeaderProps) => {
    return (
            <header className="bg-white shadow-sm p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {name}!</h1>
        {!inPersonalFeed && 
        <Link href="/">
          <p className="text-sm text-indigo-600 hover:underline mt-2 block">
            My Feed
          </p>
        </Link>
        }
        {!inGeneralFeed &&
        <Link href="/posts">
          <p className="text-sm text-indigo-600 hover:underline mt-2 block">
            General Feed
          </p>
        </Link>
        }
      </header>
    )
}