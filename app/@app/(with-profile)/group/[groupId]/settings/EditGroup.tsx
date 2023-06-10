import { notFound } from "next/navigation";
import EditGroupCard from "./EditGroupCard";
import getGroupForUser from "./getGroupForUser";

interface EditGroupProps {
  groupId: number;
}

async function EditGroup({ groupId }: EditGroupProps) {
  const group = await getGroupForUser(groupId);
  if (!group) {
    return notFound();
  }
  return (
    <EditGroupCard
      groupId={groupId}
      defaultValues={{
        name: group.name,
        description: group.description,
      }}
    />
  );
}

export default EditGroup;
