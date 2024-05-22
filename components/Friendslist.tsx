import { IUser } from "@/types/IUser";
import Link from "next/link";

export interface IFriendsListProps {
    friends: IUser[];
    currentSelectedUser?: number;
}

export interface IFriendProps {
    friend: IUser
}
const Friend = ({friend}: IFriendProps) => {
    return (
         <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{friend.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{friend.email}</p>
         </div>
    )
}

export const FriendsList = ({ friends, currentSelectedUser }: IFriendsListProps) => {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-gray-200">
            <ul role="list" className="divide-y divide-gray-200 space-y-4">
                {friends?.map((friend) => (
                <li key={friend.email} className={
                    "flex justify-between gap-x-4 py-3 px-4 bg-gray-50 rounded-md shadow-sm " + 
                    (currentSelectedUser && currentSelectedUser == friend.id ? "bg-indigo-200" : "transition-colors duration-200 hover:bg-indigo-50")
                    }>
                    { currentSelectedUser && currentSelectedUser == friend.id ?
                       <Friend friend={friend}/> :
                       <Link href={`/user/${friend.id}`} className="flex min-w-0 gap-x-4">
                        <Friend friend={friend}/>
                       </Link>
                    }
                </li> 
                ))}
            </ul>
        </div>
    );
}
