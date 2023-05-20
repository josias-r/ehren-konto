import { prisma } from "@/lib/prisma-client";

async function getGroupWithActivities(userId: string, groupId: number) {
  const groupWithActivities = await prisma.group.findFirst({
    where: {
      groupId,
      GroupMembers: {
        some: {
          userId,
        },
      },
    },
    select: {
      groupId: true,
      Activities: {
        orderBy: {
          from: "asc",
        },
        select: {
          activityId: true,
          name: true,
          from: true,
          to: true,
          color: true,
          emoji: true,
          ActivityParticipants: {
            select: {
              userId: true,
              confirmed: true,
              User: {
                select: {
                  // avatar: true,
                  userId: true,
                  name: true,
                  // nick: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return groupWithActivities;
}

type GroupActivitiesReturn = ReturnType<typeof getGroupWithActivities>;

export type GroupActivities = GroupActivitiesReturn extends Promise<infer U>
  ? U
  : never;

export default getGroupWithActivities;
