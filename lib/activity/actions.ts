"use server";

import { prisma } from "../prisma-client";
import createAuthProtectedAction from "../../app/(auth)/createAuthProtectedAction";
import { ActivityColor } from "./utilities/activity-colors";
import { db } from "../kysely-client";

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
      },
    });

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

    return updatedActivity.activityId;
  }
);

interface ParticipateInActivityArgs {
  activityId: number;
}

export const participateInActivity = createAuthProtectedAction(
  async (loggedInUserId, { activityId }: ParticipateInActivityArgs) => {
    await db
      .insertInto("ActivityParticipant")
      .values({
        activityId,
        userId: loggedInUserId,
      })
      .executeTakeFirstOrThrow();

    const activityGroupId = await db
      .selectFrom("Activity")
      .where("activityId", "=", activityId)
      .select("groupId")
      .executeTakeFirstOrThrow();

    const earnedPoints = 1;
    // update user points in group
    await db
      .updateTable("GroupMember")
      .set(({ bxp }) => ({
        ehre: bxp("ehre", "+", earnedPoints),
      }))
      .where("userId", "=", loggedInUserId)
      .where("groupId", "=", activityGroupId.groupId)
      .execute();

    // create happening entry
    await db
      .insertInto("Happening")
      .values({
        relatedActivityId: activityId,
        relatedUserId: loggedInUserId,
        happeningData: {
          pointsDiff: earnedPoints,
        },
        type: "ACTIVITY_PARTICIPATION",
      })
      .executeTakeFirstOrThrow();

    return activityId;
  }
);

interface UnparticipateInActivityArgs {
  activityId: number;
}

export const unparticipateInActivity = createAuthProtectedAction(
  async (loggedInUserId, { activityId }: UnparticipateInActivityArgs) => {
    const deletedParticipant = await db
      .deleteFrom("ActivityParticipant")
      .where("activityId", "=", activityId)
      .where("userId", "=", loggedInUserId)
      .executeTakeFirstOrThrow();

    if (deletedParticipant.numDeletedRows !== BigInt(1)) {
      throw new Error("No such participant");
    }

    const activityGroupId = await db
      .selectFrom("Activity")
      .where("activityId", "=", activityId)
      .select("groupId")
      .executeTakeFirstOrThrow();

    const lostPoints = 1;
    // update user points in group
    await db
      .updateTable("GroupMember")
      .set(({ bxp }) => ({
        ehre: bxp("ehre", "-", lostPoints),
      }))
      .where("userId", "=", loggedInUserId)
      .where("groupId", "=", activityGroupId.groupId)
      .execute();

    // create happening entry
    await db
      .insertInto("Happening")
      .values({
        relatedActivityId: activityId,
        relatedUserId: loggedInUserId,
        happeningData: {
          pointsDiff: -lostPoints,
        },
        type: "ACTIVITY_PARTICIPATION_REMOVED",
      })
      .executeTakeFirstOrThrow();

    return activityId;
  }
);
