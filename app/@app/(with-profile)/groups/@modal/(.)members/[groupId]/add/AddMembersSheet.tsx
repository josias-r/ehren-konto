"use client";

import { UserFriends } from "@/app/@app/(with-profile)/friends/getAllFriendsForUser";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FriendsBulkListItem from "@/app/@app/(with-profile)/friends/FriendsBulkListItem";
import { addGroupMembers } from "@/app/@app/(with-profile)/groups/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface AddMembersSheetProps {
  userFriends: UserFriends;

  groupId: number;
}

function AddMembersSheet({
  userFriends,

  groupId,
}: AddMembersSheetProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const friendsInGroup: typeof userFriends = [];
  const friendsNotInGroup: typeof userFriends = [];

  const [chosenFriends, setChosenFriends] = useState<string[]>([]);

  userFriends.forEach((friend) => {
    if (friend.groups.some((group) => group.groupId === groupId)) {
      friendsInGroup.push(friend);
    } else {
      friendsNotInGroup.push(friend);
    }
  });

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Add members to group</SheetTitle>
            <SheetDescription>
              {!!friendsInGroup.length && (
                <>{friendsInGroup.length} friends are already in this group</>
              )}
              {!friendsInGroup.length && (
                <>None of your friends are in this group yet</>
              )}
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          !!friendsNotInGroup.length && (
            <SheetFooter>
              <Button
                type="button"
                onClick={() => {
                  startTransition(async () => {
                    await addGroupMembers({
                      groupId: groupId,
                      members: chosenFriends,
                    });
                    router.back();
                  });
                }}
              >
                Add
              </Button>
            </SheetFooter>
          )
        }
      >
        <div className="grid gap-6">
          {friendsNotInGroup.map((friend) => (
            <FriendsBulkListItem
              key={friend.userId}
              friend={friend}
              onChosenFriendsChange={(newChosenFriends) => {
                setChosenFriends(newChosenFriends);
              }}
              chosenFriends={chosenFriends}
            />
          ))}
        </div>
        {!friendsNotInGroup.length && (
          <EmptyState
            title="No additonal friends"
            message={
              <>
                You can add more friends on the{" "}
                <Button
                  className="inline p-0"
                  variant="link"
                  onClick={() => {
                    router.push("/friends");
                  }}
                >
                  friends
                </Button>{" "}
                page
              </>
            }
            className="pt-12"
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default AddMembersSheet;
