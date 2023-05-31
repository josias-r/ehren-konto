import DeleteGroupButton from "./DeleteGroupButton";
import EditGroup from "./EditGroup";
import LeaveGroupButton from "./LeaveGroupButton";

interface GroupMembersPageProps {
  params: {
    groupId: string;
  };
}

function GroupMembersPage({ params }: GroupMembersPageProps) {
  const groupId = parseInt(params.groupId);
  return (
    <div className="grid gap-4">
      {/* @ts-expect-error server component */}
      <EditGroup groupId={groupId} />
      <LeaveGroupButton groupId={groupId} />
      <DeleteGroupButton groupId={groupId} />
    </div>
  );
}

export default GroupMembersPage;
