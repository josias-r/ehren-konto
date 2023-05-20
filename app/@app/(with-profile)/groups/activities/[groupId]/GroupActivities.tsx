import { getUserId } from "@/app/(auth)/getUserId";
import { notFound } from "next/navigation";
import GroupActivitiesSheet from "./GroupActivitiesSheet";
import getGroupActivities from "./getGroupActivities";

interface GroupActivitiesProps {
  groupId: number;
}

async function GroupActivities({ groupId }: GroupActivitiesProps) {
  const userId = getUserId();
  const goupWithActivities = await getGroupActivities(userId, groupId);

  if (!goupWithActivities) {
    return notFound();
  }

  return <GroupActivitiesSheet activities={goupWithActivities} />;
}

export default GroupActivities;
