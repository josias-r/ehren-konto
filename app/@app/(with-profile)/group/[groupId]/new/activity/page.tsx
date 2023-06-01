import CreateActivity from "./CreateActivity";

interface CreateActivityPageProps {
  params: {
    groupId: string;
  };
}

function CreateActivityPage({ params }: CreateActivityPageProps) {
  // @ts-expect-error server component
  return <CreateActivity groupId={parseInt(params.groupId)} />;
}

export default CreateActivityPage;
