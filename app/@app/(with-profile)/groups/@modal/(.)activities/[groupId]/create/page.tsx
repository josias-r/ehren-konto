import CreateActivity from "../../../../activities/[groupId]/create/CreateActivity";

async function CreateActivityPage({ params }: { params: { groupId: string } }) {
  // @ts-expect-error server component
  return <CreateActivity groupId={parseInt(params.groupId)} />;
}

export default CreateActivityPage;
