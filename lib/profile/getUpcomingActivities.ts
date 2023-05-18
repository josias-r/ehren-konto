import { prisma } from "../prisma-client";

function generateTimeRangeQuery(minTime: Date, maxTime: Date, userId: string) {
  return {
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
      emoji: true,
      Group: {
        select: {
          groupId: true,
          name: true,
        },
      },
      // to: true,
    },
    orderBy: {
      from: "asc",
    },
  } as const;
}

export async function getUpcomingActivities(userId: string) {
  const now = new Date();
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const activitiesToday = await prisma.activity.findMany(
    generateTimeRangeQuery(now, todayEnd, userId)
  );

  const thisWeekStart = new Date(todayEnd.getTime() + 1);
  thisWeekStart.setDate(thisWeekStart.getDate() + 1);
  const thisWeekEnd = new Date();
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 7);

  const activitiesNextSevenDays = await prisma.activity.findMany(
    generateTimeRangeQuery(thisWeekStart, thisWeekEnd, userId)
  );

  const thisMonthStart = new Date(thisWeekEnd.getTime() + 1);
  const thisMonthEnd = new Date();
  thisMonthEnd.setDate(thisMonthEnd.getDate() + 30);

  const activitiesNextThirtyDays = await prisma.activity.findMany(
    generateTimeRangeQuery(thisMonthStart, thisMonthEnd, userId)
  );

  return {
    today: activitiesToday,
    nextSevenDays: activitiesNextSevenDays,
    nextThirtyDays: activitiesNextThirtyDays,
  };
}
