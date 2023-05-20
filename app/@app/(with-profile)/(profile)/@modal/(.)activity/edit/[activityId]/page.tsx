import EditActivity from "@/app/@app/(with-profile)/activity/edit/[activityId]/EditActivity";

async function EditActivityPage({
  params,
}: {
  params: { activityId: string };
}) {
  // @ts-expect-error server component
  return <EditActivity activityId={parseInt(params.activityId)} />;
}

export default EditActivityPage;
