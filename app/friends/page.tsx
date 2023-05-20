import { getUserId } from "@/lib/auth/getUserId";
import getAllFriendsForUser from "./getAllFriendsForUser";
import FriendList from "./FriendList";

interface FriendsProps {}

export const metadata = {
  title: "Friends",
  description: "Add and manage your friends.",
};

async function Friends({}: FriendsProps) {
  const userId = await getUserId();

  const { userGroups, userFriends } = await getAllFriendsForUser(userId);

  // group userFriends by first letter of name
  const userFriendsByLetter = userFriends.reduce((acc, friend) => {
    const firstLetter = friend.name[0]?.toUpperCase() || "?"; // ? fallback for empty names
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(friend);
    return acc;
  }, {} as Record<string, typeof userFriends>);

  const friendLettersSorted = Object.keys(userFriendsByLetter).sort();

  return (
    <main className="relative">
      <FriendList
        friendLettersSorted={friendLettersSorted}
        userFriendsByLetter={userFriendsByLetter}
        userGroups={userGroups}
      />
    </main>
  );
}

export default Friends;
