"use client";

import {
  ChevronRight,
  CircleEllipsis,
  Delete,
  DoorOpen,
  Edit2,
  UserMinus2,
  UserPlus2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";

import EditGroupSheet from "./EditGroupSheet";
import DeleteGroupAlert from "./DeleteGroupAlert";
import LeaveGroupAlert from "./LeaveGroupAlert";
import { useState } from "react";
import RemoveMembersFromGroup from "./RemoveMembersFromGroup";

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
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [removeMembersOpen, setRemoveMembersOpen] = useState(false);

  return (
    <>
      <EditGroupSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        groupId={groupId}
        defaultValues={{
          name,
          description,
        }}
      />
      <DeleteGroupAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        groupId={groupId}
        onDone={() => setOpen(false)}
      />
      <LeaveGroupAlert
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        groupId={groupId}
        onDone={() => setOpen(false)}
      />
      <AddFriendToGroupSheet
        open={addFriendOpen}
        onOpenChange={setAddFriendOpen}
        friends={friends}
        groupId={groupId}
        friendGroups={friendGroups}
      />
      <RemoveMembersFromGroup
        open={removeMembersOpen}
        onOpenChange={setRemoveMembersOpen}
        members={members}
        groupId={groupId}
      />
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <CircleEllipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setAddFriendOpen(true);
                      }}
                    >
                      <UserPlus2 className="w-4 h-4 mr-2" />
                      <span>Add members</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setRemoveMembersOpen(true)}
                    >
                      <UserMinus2 className="w-4 h-4 mr-2" />
                      <span>Remove members</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLeaveOpen(true)}>
                      <DoorOpen className="w-4 h-4 mr-2" />
                      <span>Leave group</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                      <Delete className="w-4 h-4 mr-2" />
                      <span>Delete group</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
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
    </>
  );
}

export default GroupSheet;
