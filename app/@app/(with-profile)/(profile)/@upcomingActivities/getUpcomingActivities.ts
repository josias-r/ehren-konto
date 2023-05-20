import "server-only";
import { ActivityColor } from "@/lib/activity/utilities/activity-colors";
import { prisma } from "@/lib/prisma-client";

async function getActivitiesInTimeRange(
  minTime: Date,
  maxTime: Date,
  userId: string
) {
  return prisma.activity.findMany({
    where: {
      from: {
        gte: minTime,
        lte: maxTime,
      },
      Group: {
        GroupMembers: {
          some: {
            userId,
          },
        },
      },
    },
    select: {
      activityId: true,
      from: true,
      name: true,
      emoji: true,
      color: true,
      Group: {
        select: {
          groupId: true,
          name: true,
        },
      },
      ActivityParticipants: {
        select: {
          userId: true,
          confirmed: true,
          User: {
            select: {
              name: true,
            },
          },
        },
      },
      // to: true,
    },
    orderBy: {
      from: "asc",
    },
  });
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
        name: participant.User.name,
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
