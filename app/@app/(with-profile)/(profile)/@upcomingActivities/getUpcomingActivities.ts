import "server-only";
import { ActivityColor } from "@/lib/activity/utilities/activity-colors";
import { db } from "@/lib/kysely-client";

async function getActivitiesInTimeRange(
  minTime: Date,
  maxTime: Date,
  userId: string
) {
  const activities = await db
    .selectFrom("Activity")
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .whereRef("GroupMember.groupId", "=", "Activity.groupId")
          .where("GroupMember.userId", "=", userId)
      )
    )
    .where("Activity.from", ">=", minTime)
    .where("Activity.from", "<=", maxTime)
    // .leftJoin(
    //   db
    //     .selectFrom("ActivityParticipant")
    //     .where("ActivityParticipant.userId", "=", userId)
    //     .selectAll()
    //     .as("ActivityParticipant"),
    //   "ActivityParticipant.activityId",
    //   "Activity.activityId"
    // )
    .innerJoin(
      "Group as ActivityGroup",
      "ActivityGroup.groupId",
      "Activity.groupId"
    )
    .select([
      "Activity.activityId",
      "Activity.from",
      "Activity.name",
      "Activity.emoji",
      "Activity.color",
      "Activity.to",
      "ActivityGroup.groupId",
      "ActivityGroup.name as ActivityGroupName",
    ])
    .orderBy("Activity.from", "asc")
    .execute();

  const activitiesWithParticipants = activities.map(async (activity) => {
    const participants = await db
      .selectFrom("ActivityParticipant")
      .where("ActivityParticipant.activityId", "=", activity.activityId)
      .innerJoin("User", "User.userId", "ActivityParticipant.userId")
      .select([
        "ActivityParticipant.userId",
        "ActivityParticipant.confirmed",
        "User.name",
      ])
      .execute();

    return {
      activityId: activity.activityId,
      from: activity.from,
      name: activity.name,
      emoji: activity.emoji,
      color: activity.color,
      to: activity.to,
      Group: {
        groupId: activity.groupId,
        name: activity.ActivityGroupName,
      },
      ActivityParticipants: participants,
    };
  });

  return Promise.all(activitiesWithParticipants);
}

// ReturnType of getActivitiesInTimeRange without promise
type ActivityListPromise = ReturnType<typeof getActivitiesInTimeRange>;
// convert Promise<ActiviteList> into ActivityList (without promise)
type ActivityList = ActivityListPromise extends Promise<infer T> ? T : never;

function groupActivitiesByGroup(activities: ActivityList) {
  const groupedActivitiesObj: {
    [groupId: number]: {
      name: string;
      activities: {
        activityId: number;
        from: Date;
        emoji: string;
        color: ActivityColor;
        name: string;
        participants: {
          confirmed: boolean;
          userId: string;
          name: string;
        }[];
      }[];
    };
  } = {};
  const groupedActivities = activities.reduce((acc, activity) => {
    const group = acc[activity.Group.groupId];
    const normalizedActivity = {
      activityId: activity.activityId,
      from: activity.from,
      emoji: activity.emoji,
      color: activity.color,
      name: activity.name,
      participants: activity.ActivityParticipants.map((participant) => ({
        userId: participant.userId,
        name: participant.name,
        confirmed: participant.confirmed,
      })),
    };
    if (group) {
      group.activities.push(normalizedActivity);
    } else {
      acc[activity.Group.groupId] = {
        name: activity.Group.name,
        activities: [normalizedActivity],
      };
    }
    return acc;
  }, groupedActivitiesObj);

  return Object.entries(groupedActivities);
}

export type NormalizedUpcomingActivities = ReturnType<
  typeof groupActivitiesByGroup
>;

export async function getUpcomingActivities(userId: string) {
  const now = new Date();
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const activitiesToday = await getActivitiesInTimeRange(now, todayEnd, userId);

  const thisWeekStart = new Date(todayEnd.getTime() + 1);
  const thisWeekEnd = new Date();
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 7);

  const activitiesNextSevenDays = await getActivitiesInTimeRange(
    thisWeekStart,
    thisWeekEnd,
    userId
  );

  const thisMonthStart = new Date(thisWeekEnd.getTime() + 1);
  const thisMonthEnd = new Date();
  thisMonthEnd.setDate(thisMonthEnd.getDate() + 30);

  const activitiesNextThirtyDays = await getActivitiesInTimeRange(
    thisMonthStart,
    thisMonthEnd,
    userId
  );

  return {
    today: groupActivitiesByGroup(activitiesToday),
    nextSevenDays: groupActivitiesByGroup(activitiesNextSevenDays),
    nextThirtyDays: groupActivitiesByGroup(activitiesNextThirtyDays),
  };
}
