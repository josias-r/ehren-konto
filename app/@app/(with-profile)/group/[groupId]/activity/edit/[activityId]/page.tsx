import EditActivity from "./EditActivity";

async function EditActivityPage({
  params,
}: {
  params: { activityId: string; groupId: string };
}) {
  return (
    // @ts-expect-error server component
    <EditActivity
      activityId={parseInt(params.activityId)}
      groupId={parseInt(params.groupId)}
    />
  );
}

export default EditActivityPage;
