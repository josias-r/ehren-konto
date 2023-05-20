import { getUserId } from "@/lib/auth/getUserId";
import { notFound } from "next/navigation";
import GroupActivitiesSheet from "./GroupActivitiesSheet";
import getGroupWithActivities from "./getGroupWithActivities";

interface GroupActivitiesProps {
  groupId: number;
}

async function GroupActivities({ groupId }: GroupActivitiesProps) {
  const userId = getUserId();
  const goupWithActivities = await getGroupWithActivities(userId, groupId);

  if (!goupWithActivities) {
    return notFound();
  }

  return <GroupActivitiesSheet activities={goupWithActivities.Activities} />;
}

export default GroupActivities;
