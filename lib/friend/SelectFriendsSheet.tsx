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
          {friends.map((friends) => (
            <div
              key={friends.userId}
              className="flex gap-8 items-center cursor-pointer"
              onClick={() => {
                if (chosenFriends.includes(friends.userId)) {
                  onChosenFriendsChange(
                    chosenFriends.filter((id) => id !== friends.userId)
                  );
                } else {
                  onChosenFriendsChange([...chosenFriends, friends.userId]);
                }
              }}
            >
              <div className="flex-grow flex-shrink-1 w-full">
                <FriendListItem
                  userId={friends.userId}
                  nick={friends.nick}
                  name={friends.name}
                  avatar={friends.avatar}
                  groups={friends.groups}
                  friendGroups={friendGroups}
                />
              </div>
              <div className="flex-grow flex-shrink-0">
                {chosenFriends.includes(friends.userId) ? (
                  <CheckCircle2 className="2-4 h-4" />
                ) : (
                  <Circle className="2-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SelectFriendsSheet;
