"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CircleEllipsis,
  Delete,
  DoorOpen,
  Edit2,
  UserPlus2,
} from "lucide-react";
import { GroupMembers } from "./getGroupWithMembers";
import { useRouter } from "next/navigation";
import GroupMemberListItem from "@/app/@app/(with-profile)/groups/GroupMemberListItem";
import DeleteGroupAlert from "@/app/@app/(with-profile)/groups/members/[groupId]/DeleteGroupAlert";
import LeaveGroupAlert from "@/app/@app/(with-profile)/groups/members/[groupId]/LeaveGroupAlert";
import { useState } from "react";
import Link from "next/link";
import { UserMinus2 } from "lucide-react";

interface GroupMembersSheetProps {
  groupId: number;
  members: NonNullable<GroupMembers>["GroupMembers"];
}

function GroupMembersSheet({ groupId, members }: GroupMembersSheetProps) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <DeleteGroupAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        groupId={groupId}
        onDone={() => router.back()}
      />
      <LeaveGroupAlert
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        groupId={groupId}
        onDone={() => router.back()}
      />
      <Sheet
        open
        onOpenChange={() => {
          router.back();
        }}
      >
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
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/edit/${groupId}`}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/members/${groupId}/add`}>
                        <UserPlus2 className="w-4 h-4 mr-2" />
                        <span>Add members</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/members/${groupId}/remove`}>
                        <UserMinus2 className="w-4 h-4 mr-2" />
                        <span>Remove members</span>
                      </Link>
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
                key={member.User.userId}
                userId={member.User.userId}
                nick={member.User.nick}
                name={member.User.name}
                role={member.role}
                ehre={member.ehre}
                avatar={member.User.avatar}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default GroupMembersSheet;
