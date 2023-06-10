"use client";

import FriendListItem from "@/app/@app/(with-profile)/friends/FriendListItem";
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
import { Fragment, useState, useTransition } from "react";
import FriendsBulkListItem from "./FriendsBulkListItem";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import removeFriends from "@/app/api/friend/remove/removeFriends";
import isNotApiError from "@/app/api/handlers/isNotApiError";
import isApiError from "@/app/api/handlers/isApiError";
import { useLoadingToast } from "@/components/ui/use-loading-toast";

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
        name: string;
      }[];
    }[]
  >;
}

function FriendList({
  friendLettersSorted,
  userFriendsByLetter,
}: FriendListProps) {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const [isRemoving, setIsRemoving] = useState(false);

  const router = useRouter();

  const { loadingToastFromPromise } = useLoadingToast();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Friends</span>
        {isMultiSelect && (
          <div>
            <Button
              size="sm"
              variant="destructive"
              disabled={isRemoving || !selectedFriends.length}
              onClick={async () => {
                const createPromise = async () => {
                  const removeResponse = await removeFriends({
                    userIds: selectedFriends,
                  });

                  if (isNotApiError(removeResponse)) {
                    setSelectedFriends([]);
                    router.refresh();
                  }

                  if (isApiError(removeResponse)) {
                    throw new Error(removeResponse.error.message);
                  }
                };
                setIsRemoving(true);
                await loadingToastFromPromise(
                  "Removing friend",
                  "Failed to remove friend",
                  createPromise()
                );
                setIsRemoving(false);
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
