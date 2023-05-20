import { getUserId } from "@/lib/auth/getUserId";
import getUserActivity from "./getUserActivity";
import EditActivitySheet from "@/app/@app/activities/edit/[activityId]/EditActivitySheet";
import { notFound } from "next/navigation";

async function EditActivity({ activityId }: { activityId: number }) {
  const userId = getUserId();
  const activity = await getUserActivity(userId, activityId);

  if (!activity) {
    return notFound();
  }

  const hours = activity.from.getHours().toString().padStart(2, "0");
  const minutes = activity.from.getMinutes().toString().padStart(2, "0");
  const fromTime = `${hours}:${minutes}`;

  return (
    <EditActivitySheet
      defaultValues={{
        emoji: activity.emoji,
        name: activity.name,
        color: activity.color,
        from: activity.from,
        fromTime: fromTime,
      }}
      activityId={activityId}
    />
  );
}

export default EditActivity;
