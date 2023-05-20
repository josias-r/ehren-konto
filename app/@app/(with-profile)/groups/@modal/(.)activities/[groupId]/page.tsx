import GroupActivities from "@/app/@app/(with-profile)/groups/activities/[groupId]/GroupActivities";

async function GroupMembersPage({ params }: { params: { groupId: string } }) {
  // @ts-expect-error server component
  return <GroupActivities groupId={parseInt(params.groupId)} />;
}

export default GroupMembersPage;
