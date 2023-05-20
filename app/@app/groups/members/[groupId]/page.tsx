import GroupMembers from "./GroupMembers";

interface GroupMembersPageProps {
  params: {
    groupId: string;
  };
}

function GroupMembersPage({ params }: GroupMembersPageProps) {
  // @ts-expect-error server component
  return <GroupMembers groupId={parseInt(params.groupId)} />;
}

export default GroupMembersPage;
