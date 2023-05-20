import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import FriendsBulkListItem from "../../friends/FriendsBulkListItem";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";
import { UserFriends, UserGroups } from "../../friends/getAllFriendsForUser";

interface SelectFriendsSheetProps {
  chosenFriends: string[];
  onChosenFriendsChange: (chosenFriends: string[]) => void;

  userFriends: UserFriends;
  userGroups: UserGroups;
  children: ReactNode;
}

function SelectFriendsSheet({
  chosenFriends,
  onChosenFriendsChange,
  userFriends,
  userGroups,
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
          {userFriends.map((friend) => (
            <FriendsBulkListItem
              key={friend.userId}
              friend={friend}
              onChosenFriendsChange={onChosenFriendsChange}
              chosenFriends={chosenFriends}
              friendGroups={userGroups}
            />
          ))}
        </div>
        {!userFriends.length && (
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
