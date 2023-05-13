import FriendListItem from "@/components/FriendListItem";
import Nav from "@/components/Nav";
import { Separator } from "@/components/ui/separator";
import { validateCookieToken } from "@/lib/auth.server";
import getAllFriendsForUser from "@/lib/friend/getAllFriendsForUser";
import { redirect } from "next/navigation";

export default async function Friends() {
  const isLoggedIn = await validateCookieToken();
  if (isLoggedIn === false) {
    redirect("/login");
  }

  const { userGroups, userFriends } = await getAllFriendsForUser(
    isLoggedIn.userId
  );

  // group userFriends by first letter of name
  const userFriendsByLetter = userFriends.reduce((acc, friend) => {
    const firstLetter = friend.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(friend);
    return acc;
  }, {} as Record<string, typeof userFriends>);

  const friendLettersSorted = Object.keys(userFriendsByLetter).sort();

  return (
    <main className="relative">
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6">Friends</h1>
      <section className="mx-auto p-8 max-w-md grid gap-4">
        {friendLettersSorted.map((letter, index) => {
          return (
            <>
              {index !== 0 && <Separator />}
              <section
                key={letter}
                aria-label={`Friends with names starting with ${letter}`}
              >
                <h3 className="text-lg font-medium mb-2">{letter}</h3>
                <div className="grid gap-6">
                  {userFriendsByLetter[letter].map((friend) => {
                    return (
                      <FriendListItem
                        key={friend.userId}
                        avatar={friend.avatar}
                        name={friend.name}
                        nick={friend.nick}
                        userId={friend.userId}
                        groups={friend.groups}
                        friendGroups={userGroups}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          );
        })}
      </section>

      <Nav />
    </main>
  );
}
