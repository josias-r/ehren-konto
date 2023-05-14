"use client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";

import EditGroupSheet from "./EditGroupSheet";
import DeleteGroup from "./DeleteGroup";
import LeaveGroup from "./LeaveGroup";
import { useState } from "react";

interface GroupSheetProps {
  leftoverAmount: number;
  name: string;
  description: string;
  members: MemberShape[];

  groupId: number;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function GroupSheet({
  leftoverAmount,
  name,
  description,
  members,
  friends,
  friendGroups,
  groupId,
}: GroupSheetProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
              <EditGroupSheet
                groupId={groupId}
                defaultValues={{
                  name,
                  description,
                }}
              >
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
            <DeleteGroup groupId={groupId} onDone={() => setOpen(false)} />
            <LeaveGroup groupId={groupId} />
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
