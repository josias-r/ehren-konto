import { GroupFriend, GroupFriendGroup } from "../group/GroupCard";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import FriendsBulkListItem from "./FriendsBulkListItem";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";

interface SelectFriendsSheetProps {
  chosenFriends: string[];
  onChosenFriendsChange: (chosenFriends: string[]) => void;
  /** null indicates the modal is used for a create group modal */
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];

  children: ReactNode;
}

function SelectFriendsSheet({
  chosenFriends,
  onChosenFriendsChange,
  friends,
  friendGroups,
  children,
}: SelectFriendsSheetProps) {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Select friends</SheetTitle>
            <SheetDescription>
              {chosenFriends.length} friends selected
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <SheetClose className={buttonVariants({ variant: "outline" })}>
              Close
            </SheetClose>
          </SheetFooter>
        }
      >
        <div className="grid gap-6">
          {friends.map((friend) => (
            <FriendsBulkListItem
              key={friend.userId}
              friend={friend}
              onChosenFriendsChange={onChosenFriendsChange}
              chosenFriends={chosenFriends}
              friendGroups={friendGroups}
            />
          ))}
        </div>
        {!friends.length && (
          <EmptyState
            title="No friends yet"
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

export default SelectFriendsSheet;
