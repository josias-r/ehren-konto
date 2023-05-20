import EditGroup from "./EditGroup";

interface GroupMembersPageProps {
  params: {
    groupId: string;
  };
}

function GroupMembersPage({ params }: GroupMembersPageProps) {
  // @ts-expect-error server component
  return <EditGroup groupId={parseInt(params.groupId)} />;
}

export default GroupMembersPage;
