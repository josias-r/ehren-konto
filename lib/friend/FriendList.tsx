"use client";

import FriendListItem from "@/lib/friend/FriendListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CircleEllipsis, QrCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { GroupFriendGroup } from "../group/GroupCard";
import { useState, useTransition } from "react";
import FriendsBulkListItem from "./FriendsBulkListItem";
import { unfriendUsers } from "./actions";

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
  const [selectedFirends, setSelectedFriends] = useState<string[]>([]);

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
              disabled={isPending || !selectedFirends.length}
              onClick={() => {
                setSelectedFriends([]);

                startTransition(async () => {
                  await unfriendUsers({
                    userIds: selectedFirends,
                  });
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
              <DropdownMenuItem
                onClick={() => {
                  setIsMultiSelect(true);
                }}
              >
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
                    if (isMultiSelect) {
                      return (
                        <FriendsBulkListItem
                          key={friend.userId}
                          friend={friend}
                          chosenFriends={selectedFirends}
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
            </>
          );
        })}
      </section>
    </>
  );
}

export default FriendList;
