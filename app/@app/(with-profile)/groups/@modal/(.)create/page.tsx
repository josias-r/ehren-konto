import CreateGroup from "../../create/CreateGroup";

async function CreateGroupPage() {
  // @ts-expect-error server component
  return <CreateGroup />;
}

export default CreateGroupPage;
