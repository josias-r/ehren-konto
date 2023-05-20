import EditGroup from "@/app/@app/groups/edit/[groupId]/EditGroup";

async function EditGroupPage({ params }: { params: { groupId: string } }) {
  // @ts-expect-error server component
  return <EditGroup groupId={parseInt(params.groupId)} />;
}

export default EditGroupPage;
