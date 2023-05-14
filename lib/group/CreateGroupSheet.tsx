import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import AddFriendToGroupSheet from "../friend/AddFriendToGroupSheet";
import { GroupFriend, GroupFriendGroup } from "./GroupCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CreateGroupSheetProps {
  children: ReactNode;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function CreateGroupSheet({
  friends,
  friendGroups,
  children,
}: CreateGroupSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Create group</SheetTitle>
            <SheetDescription>
              Create a group and add members to it
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <form action="">
            <div className="mx-auto max-w-md px-6 sm:px-0">
              <div className="mt-8 grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-2 h-8"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    defaultValue=""
                    className="col-span-2 h-8"
                    required
                  />
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <AddFriendToGroupSheet
                  friends={friends}
                  friendGroups={friendGroups}
                  groupId={null}
                />
                <Button type="submit" className="block w-full">
                  Create group
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateGroupSheet;
