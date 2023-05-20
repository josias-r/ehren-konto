import EditActivity from "./EditActivity";

async function EditActivityPage({
  params,
}: {
  params: { activityId: string };
}) {
  // @ts-expect-error server component
  return <EditActivity activityId={parseInt(params.activityId)} />;
}

export default EditActivityPage;
