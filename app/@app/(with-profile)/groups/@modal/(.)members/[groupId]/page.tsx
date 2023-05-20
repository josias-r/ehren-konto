import GroupMembers from "../../../members/[groupId]/GroupMembers";

async function GroupMembersPage({ params }: { params: { groupId: string } }) {
  // @ts-expect-error server component
  return <GroupMembers groupId={parseInt(params.groupId)} />;
}

export default GroupMembersPage;
