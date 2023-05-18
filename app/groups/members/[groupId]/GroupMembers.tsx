import { getUserId } from "@/lib/auth/getUserId";
import GroupMembersSheet from "./GroupMembersSheet";
import getGroupWithMembers from "./getGroupWithMembers";
import { notFound } from "next/navigation";

interface GroupMembersProps {
  groupId: number;
}

async function GroupMembers({ groupId }: GroupMembersProps) {
  const userId = getUserId();
  const groupWithMembers = await getGroupWithMembers(userId, groupId);

  if (!groupWithMembers) {
    return notFound();
  }

  return (
    <GroupMembersSheet
      members={groupWithMembers.GroupMembers}
      groupId={groupWithMembers.groupId}
    />
  );
}

export default GroupMembers;
