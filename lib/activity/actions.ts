"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../utilities/prisma-client";
import createAuthProtectedAction from "../createAuthProtectedAction";
import { EventColor } from "../utilities/event-colors";

interface CreateActivityArgs {
  groupId: number;
  name: string;
  from: Date;
  emoji: string;
  color: EventColor;

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

    revalidatePath("/activities");

    return createdActivity.activityId;
  }
);

interface UpdateActivityArgs {
  activityId: number;
  name: string;
  from: Date;
  emoji: string;
  color: EventColor;
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

    revalidatePath("/activities");

    return updatedActivity.activityId;
  }
);
