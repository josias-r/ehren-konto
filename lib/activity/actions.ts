"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma-client";
import createAuthProtectedAction from "../auth/createAuthProtectedAction";
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
    revalidatePath("/profile");

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
    revalidatePath("/profile");

    return updatedActivity.activityId;
  }
);
