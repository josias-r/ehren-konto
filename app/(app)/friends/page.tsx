import FriendListItem from "@/lib/friend/FriendListItem";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getAllFriendsForUser from "@/lib/friend/getAllFriendsForUser";
import { CheckCircle2, CircleEllipsis, QrCode, ScanLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { getUserId } from "@/lib/auth/getUserId";
import CopyInviteLinkDropdownItem from "@/lib/friend/CopyInviteLinkDropdownItem";
import Link from "next/link";

export const metadata = {
  title: "Friends",
  description: "Add and manage your friends.",
};

export default async function Friends() {
  const userId = getUserId();

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
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Friends</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <CircleEllipsis className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              <span>Select</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <ScanLine className="w-4 h-4 mr-2" />
              <span>Scan friend code</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link href="/friends/qr">
                <QrCode className="w-4 h-4 mr-2" />
                <span>Show my friend code</span>
              </Link>
            </DropdownMenuItem>
            <CopyInviteLinkDropdownItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </h1>
      <section className="mx-auto p-4 max-w-md grid gap-4">
        {!friendLettersSorted?.length && (
          <EmptyState
            title="No friends"
            message={
              <>
                Go and invite your friends to join via a shared link or a QR
                code.
              </>
            }
            className="h-[80vh]"
          />
        )}
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
