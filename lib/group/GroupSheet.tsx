import {
  CheckCircle2,
  ChevronRight,
  CircleEllipsis,
  Edit2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import GroupMemberListItem, { MemberShape } from "./GroupMemberListItem";
import { GroupFriend, GroupFriendGroup } from "./GroupCard";
import AddFriendToGroupSheet from "../friend/AddFriendToGroupSheet";
import { Separator } from "../../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CreateGroupSheet from "./CreateGroupSheet";
import EditGroupSheet from "./EditGroupSheet";

interface GroupSheetProps {
  leftoverAmount: number;
  members: MemberShape[];

  groupId: number;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function GroupSheet({
  leftoverAmount,
  members,
  friends,
  friendGroups,
  groupId,
}: GroupSheetProps) {
  return (
    <Sheet>
      <div className="relative -mx-2 -mb-2 text-muted-foreground">
        <SheetTrigger className="hover:bg-slate-800 rounded-sm w-full flex justify-between items-center text-sm p-2 mt-2">
          <div>
            {leftoverAmount > 1 && <>Show {leftoverAmount} more</>}
            {leftoverAmount <= 1 && <>Manage group</>}
          </div>
          <div>
            <ChevronRight className="h-4 w-4" />
          </div>
        </SheetTrigger>
      </div>
      <SheetContent
        headerChildren={
          <div className="flex justify-between">
            <SheetHeader>
              <SheetTitle className="flex justify-between">
                <span>Group members</span>
              </SheetTitle>
              <SheetDescription>
                There are {members.length} members in this group
              </SheetDescription>
            </SheetHeader>
            <div>
              <EditGroupSheet>
                <Button variant="ghost">
                  <Edit2 className="h-5 w-5" />
                </Button>
              </EditGroupSheet>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        }
        footerChildren={
          <SheetFooter className="grid justify-normal">
            <AddFriendToGroupSheet
              friends={friends}
              groupId={groupId}
              friendGroups={friendGroups}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Leave group</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will not have access to
                    the group anymore.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete group</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This group will be deleted for
                    all members.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        }
      >
        <div className="grid gap-6">
          {members.map((member) => (
            <GroupMemberListItem
              key={member.userId}
              userId={member.userId}
              nick={member.nick}
              name={member.name}
              role={member.role}
              ehre={member.ehre}
              avatar={member.avatar}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupSheet;
