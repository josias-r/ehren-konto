import getGroupName from "../../getGroupName";
import CreateActivityCard from "./CreateActivityCard";

interface CreateActivityProps {
  groupId: number;
}

async function CreateActivity({ groupId }: CreateActivityProps) {
  const groupWName = await getGroupName({ groupId });
  return <CreateActivityCard groupId={groupId} groupName={groupWName.name} />;
}

export default CreateActivity;
