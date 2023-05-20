"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";
import createAuthProtectedAction from "../../app/(auth)/createAuthProtectedAction";
import { ActivityColor } from "./utilities/activity-colors";

interface CreateActivityArgs {
  groupId: number;
  name: string;
  from: Date;
  emoji: string;
  color: ActivityColor;

  // to: Date;
  // members: number[];
}

export const createActivity = createAuthProtectedAction(
  async (
    loggedInUserId,
    { name, from, emoji, color, groupId }: CreateActivityArgs
  ) => {
    const createdActivity = await prisma.activity.create({
      data: {
        groupId,
        name,
        from,
        emoji,
        color,
        // to,
        // ActivityMembers: {
        //   create: [
        //     ...members.map((userId) => ({ userId })),
        //     // Add the creator to the activity
        //     { userId: loggedInUserId },
        //   ],
        // },
      },
    });

    revalidatePath("/groups");
    revalidatePath("/");

    return createdActivity.activityId;
  }
);

interface UpdateActivityArgs {
  activityId: number;
  name: string;
  from: Date;
  emoji: string;
  color: ActivityColor;
}

export const updateActivity = createAuthProtectedAction(
  async (
    loggedInUserId,
    { activityId, name, from, emoji, color }: UpdateActivityArgs
  ) => {
    const updatedActivity = await prisma.activity.update({
      where: { activityId },
      data: {
        name,
        from,
        emoji,
        color,
      },
    });

    revalidatePath("/groups");
    revalidatePath("/");

    return updatedActivity.activityId;
  }
);

interface ParticipateInActivityArgs {
  activityId: number;
}

export const participateInActivity = createAuthProtectedAction(
  async (loggedInUserId, { activityId }: ParticipateInActivityArgs) => {
    const createdParticipant = await prisma.activityParticipant.create({
      data: {
        activityId,
        userId: loggedInUserId,
      },
      select: {
        Activity: {
          select: {
            groupId: true,
          },
        },
      },
    });

    const earnedPoints = 1;
    // update user points in group
    await prisma.groupMember.update({
      data: {
        ehre: {
          increment: earnedPoints,
        },
      },
      where: {
        userId_groupId: {
          userId: loggedInUserId,
          groupId: createdParticipant.Activity.groupId,
        },
      },
    });
    // create happening entry
    await prisma.happening.create({
      data: {
        relatedActivityId: activityId,
        relatedUserId: loggedInUserId,
        happeningData: {
          pointsDiff: earnedPoints,
        },
        type: "ACTIVITY_PARTICIPATION",
      },
    });

    revalidatePath("/groups");
    revalidatePath("/");

    return activityId;
  }
);
