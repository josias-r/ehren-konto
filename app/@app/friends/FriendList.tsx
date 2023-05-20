"use client";

import FriendListItem from "@/lib/friend/FriendListItem";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CircleEllipsis, QrCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { GroupFriendGroup } from "../groups/GroupCard";
import { Fragment, useState, useTransition } from "react";
import FriendsBulkListItem from "../../../lib/friend/FriendsBulkListItem";
import { unfriendUsers } from "../../../lib/friend/actions";
import { cn } from "../../../lib/utils";

interface FriendListProps {
  friendLettersSorted: string[];
  userFriendsByLetter: Record<
    string,
    {
      userId: string;
      name: string;
      nick: string;
      avatar: string | null;
      groups: {
        groupId: number;
      }[];
    }[]
  >;
  userGroups: GroupFriendGroup[];
}

function FriendList({
  friendLettersSorted,
  userFriendsByLetter,
  userGroups,
}: FriendListProps) {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Friends</span>
        {isMultiSelect && (
          <div>
            <Button
              size="sm"
              variant="destructive"
              disabled={isPending || !selectedFriends.length}
              onClick={() => {
                setSelectedFriends([]);

                startTransition(async () => {
                  await unfriendUsers({
                    userIds: selectedFriends,
                  });
                  setIsMultiSelect(false);
                });
              }}
            >
              Remove
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsMultiSelect(false);
                setSelectedFriends([]);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {!isMultiSelect && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <CircleEllipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!!friendLettersSorted.length && (
                <DropdownMenuItem
                  onClick={() => {
                    setIsMultiSelect(true);
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>Select</span>
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem>
              <ScanLine className="w-4 h-4 mr-2" />
              <span>Scan friend code</span>
            </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/friends/qr">
                  <QrCode className="w-4 h-4 mr-2" />
                  <span>My friend code</span>
                </Link>
              </DropdownMenuItem>
              {/* <CopyInviteLinkDropdownItem /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </h1>
      <section className="mx-auto p-4 max-w-md grid gap-4">
        {!friendLettersSorted.length && (
          <EmptyState
            title="No friends"
            message={
              <>
                Go and{" "}
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "link",
                    }),
                    "p-0 inline"
                  )}
                  href="/friends/qr"
                >
                  invite your friends
                </Link>{" "}
                to join.
              </>
            }
            className="h-[calc(100vh-10rem)]"
          />
        )}
        {friendLettersSorted.map((letter, index) => {
          return (
            <Fragment key={letter}>
              {index !== 0 && <Separator />}
              <section
                aria-label={`Friends with names starting with ${letter}`}
              >
                <h3 className="text-lg font-medium mb-2">{letter}</h3>
                <div className="grid gap-6">
                  {userFriendsByLetter[letter].map((friend) => {
                    if (isMultiSelect) {
                      return (
                        <FriendsBulkListItem
                          key={friend.userId}
                          friend={friend}
                          chosenFriends={selectedFriends}
                          onChosenFriendsChange={setSelectedFriends}
                          friendGroups={userGroups}
                        />
                      );
                    }
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
            </Fragment>
          );
        })}
      </section>
    </>
  );
}

export default FriendList;
