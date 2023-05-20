import GroupMembersSheet from "./GroupMembersSheet";
import getGroupWithMembers from "./getGroupWithMembers";
import { notFound } from "next/navigation";

interface GroupMembersProps {
  groupId: number;
}

async function GroupMembers({ groupId }: GroupMembersProps) {
  const groupWithMembers = await getGroupWithMembers(groupId);

  if (!groupWithMembers) {
    return notFound();
  }

  return <GroupMembersSheet members={groupWithMembers} groupId={groupId} />;
}

export default GroupMembers;
