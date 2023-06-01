"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import DeleteGroupAlert from "@/app/@app/(with-profile)/group/[groupId]/settings/DeleteGroupAlert";
import LeaveGroupAlert from "@/app/@app/(with-profile)/group/[groupId]/settings/LeaveGroupAlert";
import { useState } from "react";
import Link from "next/link";
import { UserMinus2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface GroupMembersListProps {
  groupId: number;
  members: NonNullable<GroupMembers>;
}

function GroupMembersList({ groupId, members }: GroupMembersListProps) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <DeleteGroupAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        groupId={groupId}
      />
      <LeaveGroupAlert
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        groupId={groupId}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Group members</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="-mb-4 -mt-2">
                  <CircleEllipsis className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/group/${groupId}/members/add`}>
                    <UserPlus2 className="w-4 h-4 mr-2" />
                    <span>Add members</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/group/${groupId}/members/remove`}>
                    <UserMinus2 className="w-4 h-4 mr-2" />
                    <span>Remove members</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>
            There are {members.length} members in this group
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
}

export default GroupMembersList;
