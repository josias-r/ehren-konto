import Group from "./Group";

interface GroupPageProps {
  params: {
    groupId: string;
  };
}

function GroupPage({ params }: GroupPageProps) {
  // @ts-expect-error server component
  return <Group groupId={parseInt(params.groupId.replace("(.)", ""))} />;
}

export default GroupPage;
