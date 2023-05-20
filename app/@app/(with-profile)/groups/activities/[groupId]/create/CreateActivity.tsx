import CreateActivitySheet from "./CreateActivitySheet";
import getGroupName from "./getGroupName";

interface CreateActivityProps {
  groupId: number;
}

async function CreateActivity({ groupId }: CreateActivityProps) {
  const groupWName = await getGroupName(groupId);
  return <CreateActivitySheet groupId={groupId} groupName={groupWName.name} />;
}

export default CreateActivity;
