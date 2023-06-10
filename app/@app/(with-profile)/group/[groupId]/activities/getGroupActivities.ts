import { db } from "@/lib/kysely-client";

async function getGroupActivities(userId: string, groupId: number) {
  const groupActivities = await db
    .selectFrom("Group")
    .where("Group.groupId", "=", groupId)
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .where("userId", "=", userId)
          .where("groupId", "=", groupId)
      )
    )
    .innerJoin("Activity", "Activity.groupId", "Group.groupId")
    .select([
      "Activity.activityId",
      "Activity.name",
      "Activity.from",
      "Activity.to",
      "Activity.color",
      "Activity.emoji",
    ])
    .execute();

  const activitiesWithParticipants = groupActivities.map(async (activity) => {
    const participants = await db
      .selectFrom("ActivityParticipant")
      .where("activityId", "=", activity.activityId)
      .innerJoin("User", "User.userId", "ActivityParticipant.userId")
      .select([
        "User.userId",
        "User.name",
        "User.avatar",
        "ActivityParticipant.confirmed",
      ])
      .execute();

    return {
      ...activity,
      participants,
    };
  });

  return Promise.all(activitiesWithParticipants);
}

type GroupActivitiesReturn = ReturnType<typeof getGroupActivities>;

export type GroupActivities = GroupActivitiesReturn extends Promise<infer U>
  ? U
  : never;

export default getGroupActivities;
