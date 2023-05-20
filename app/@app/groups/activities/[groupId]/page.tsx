import GroupActivities from "./GroupActivities";

interface GroupActivitiesPageProps {
  params: {
    groupId: string;
  };
}

function GroupActivitiesPage({ params }: GroupActivitiesPageProps) {
  // @ts-expect-error server component
  return <GroupActivities groupId={parseInt(params.groupId)} />;
}

export default GroupActivitiesPage;
