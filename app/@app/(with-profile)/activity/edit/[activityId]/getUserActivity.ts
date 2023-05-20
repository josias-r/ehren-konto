import { prisma } from "@/lib/prisma-client";
import "server-only";

async function getUserActivity(userId: string, activityId: number) {
  const userActivity = prisma.activity.findFirst({
    where: {
      activityId,
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
    },
  });

  return userActivity;
}

export default getUserActivity;
