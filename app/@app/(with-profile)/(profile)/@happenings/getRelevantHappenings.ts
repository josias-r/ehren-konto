import "server-only";

import { db } from "@/lib/kysely-client";
import { notNullOrThrow } from "@/lib/utils";

async function getRelevantHappenings(userId: string) {
  const relevantHappenings = await db
    .selectFrom("Happening")
    .leftJoin(
      db
        .selectFrom("Activity")
        .innerJoin(
          "Group as RelatedActivityGroup",
          "Activity.groupId",
          "RelatedActivityGroup.groupId"
        )
        .where(({ exists, selectFrom }) =>
          exists(
            selectFrom("GroupMember")
              .whereRef(
                "GroupMember.groupId",
                "=",
                "RelatedActivityGroup.groupId"
              )
              .where("GroupMember.userId", "=", userId)
          )
        )
        .select([
          "Activity.activityId",
          "Activity.name",
          "Activity.emoji",
          "Activity.color",
          "Activity.from",
          "RelatedActivityGroup.groupId as RelatedActivityGroupId",
          "RelatedActivityGroup.name as RelatedActivityGroupName",
        ])
        .as("RelatedActivity"),
      "RelatedActivity.activityId",
      "relatedActivityId"
    )
    .leftJoin(
      db
        .selectFrom("Group")
        .where(({ exists, selectFrom }) =>
          exists(
            selectFrom("GroupMember")
              .select("GroupMember.groupMemberId")
              .whereRef("GroupMember.groupId", "=", "Group.groupId")
              .where("GroupMember.userId", "=", userId)
          )
        )
        .selectAll()
        .as("RelatedGroup"),
      "RelatedGroup.groupId",
      "relatedGroupId"
    )
    .leftJoin(
      db
        .selectFrom("User")
        .selectAll()
        .where("User.userId", "=", userId)
        .as("RelatedUser"),
      "RelatedUser.userId",
      "relatedUserId"
    )
    .where(({ or, cmpr }) =>
      or([
        cmpr("relatedActivityId", "is not", null),
        cmpr("relatedGroupId", "is not", null),
        cmpr("relatedUserId", "is not", null),
      ])
    )
    .select([
      "Happening.happeningsId",
      "Happening.type",
      "Happening.createdAt",
      "Happening.happeningData",
      "RelatedActivity.activityId as RelatedActivityId",
      "RelatedActivity.name as RelatedActivityName",
      "RelatedActivity.emoji as RelatedActivityEmoji",
      "RelatedActivity.color as RelatedActivityColor",
      "RelatedActivity.from as RelatedActivityFrom",
      "RelatedActivity.RelatedActivityGroupId as RelatedActivityGroupId",
      "RelatedActivity.RelatedActivityGroupName as RelatedActivityGroupName",
      "RelatedGroup.groupId as RelatedGroupId",
      "RelatedGroup.name as RelatedGroupName",
      "RelatedUser.userId as RelatedUserId",
      "RelatedUser.name as RelatedUserName",
      "RelatedUser.avatar as RelatedUserAvatar",
      "RelatedUser.nick as RelatedUserNick",
    ])
    .orderBy("Happening.createdAt", "desc")
    .execute();

  const mappedRelevantHappenings = relevantHappenings.map(
    async (relevantHappening) => {
      const ActivityParticipants =
        relevantHappening.RelatedActivityId !== null
          ? await db
              .selectFrom("ActivityParticipant")
              .innerJoin("User", "ActivityParticipant.userId", "User.userId")
              .where(
                "ActivityParticipant.activityId",
                "=",
                relevantHappening.RelatedActivityId
              )
              .select([
                "ActivityParticipant.activityId",
                "ActivityParticipant.confirmed",
                "User.userId as UserId",
                "User.name as UserName",
              ])
              .execute()
          : null;
      return {
        happeningsId: relevantHappening.happeningsId,
        type: relevantHappening.type,
        createdAt: relevantHappening.createdAt,
        happeningData: relevantHappening.happeningData,
        RelatedActivity:
          relevantHappening.RelatedActivityId !== null
            ? {
                activityId: relevantHappening.RelatedActivityId,
                name: notNullOrThrow(relevantHappening.RelatedActivityName),
                emoji: notNullOrThrow(relevantHappening.RelatedActivityEmoji),
                color: notNullOrThrow(relevantHappening.RelatedActivityColor),
                from: notNullOrThrow(relevantHappening.RelatedActivityFrom),
                Group: {
                  groupId: notNullOrThrow(
                    relevantHappening.RelatedActivityGroupId
                  ),
                  name: notNullOrThrow(
                    relevantHappening.RelatedActivityGroupName
                  ),
                },
                ActivityParticipants: notNullOrThrow(ActivityParticipants),
              }
            : null,
        RelatedGroup:
          relevantHappening.RelatedGroupId !== null
            ? {
                groupId: notNullOrThrow(relevantHappening.RelatedGroupId),
                name: notNullOrThrow(relevantHappening.RelatedGroupName),
              }
            : null,
        RelatedUser:
          relevantHappening.RelatedUserId !== null
            ? {
                userId: notNullOrThrow(relevantHappening.RelatedUserId),
                name: notNullOrThrow(relevantHappening.RelatedUserName),
                avatar: relevantHappening.RelatedUserAvatar,
                nick: notNullOrThrow(relevantHappening.RelatedUserNick),
              }
            : null,
      };
    }
  );

  const finalRelevantHappenings = await Promise.all(mappedRelevantHappenings);

  return finalRelevantHappenings;
}

type RelevantHappeningsPromise = ReturnType<typeof getRelevantHappenings>;
//  infer type inside promise
export type RelevantHappenings = RelevantHappeningsPromise extends Promise<
  infer T
>
  ? T
  : never;

export default getRelevantHappenings;
