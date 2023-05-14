import FriendListItem from "./FriendListItem";
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
import { CheckCircle, CheckCircle2, Circle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import FriendsBulkListItem from "./FriendsBulkListItem";

interface SelectFriendsSheetProps {
  chosenFriends: number[];
  onChosenFriendsChange: (chosenFriends: number[]) => void;
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
      </SheetContent>
    </Sheet>
  );
}

export default SelectFriendsSheet;
