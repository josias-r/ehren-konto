import "server-only";

import { db } from "@/lib/kysely-client";

async function getAllGroupsForUser(userId: string) {
  const groups = await db
    .selectFrom("Group")
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .whereRef("GroupMember.groupId", "=", "Group.groupId")
          .where("GroupMember.userId", "=", userId)
      )
    )
    .select(["Group.groupId", "Group.name", "Group.description"])
    .execute();

  const userWithGroups = groups.map(async (group) => {
    const groupMembersQuery = db
      .selectFrom("GroupMember")
      .where("GroupMember.groupId", "=", group.groupId)
      .innerJoin("User", "User.userId", "GroupMember.userId");

    const groupMembers = await groupMembersQuery
      .select([
        "GroupMember.role",
        "GroupMember.ehre",
        "User.userId",
        "User.avatar",
        "User.name",
        "User.nick",
      ])
      .orderBy("GroupMember.ehre", "desc")
      .orderBy("User.name", "asc")
      .limit(5)
      .execute();

    const groupMembersCount = await groupMembersQuery
      .select(db.fn.countAll<number>().as("count"))
      .execute();

    const acivitiesQuery = db
      .selectFrom("Activity")
      .where("Activity.groupId", "=", group.groupId);

    const activities = await acivitiesQuery
      .orderBy("Activity.from", "asc")
      .select([
        "Activity.activityId",
        "Activity.name",
        "Activity.from",
        "Activity.to",
        "Activity.emoji",
        "Activity.color",
      ])
      .limit(6)
      .execute();

    const activitiesCount = await acivitiesQuery
      .select(db.fn.countAll<number>().as("count"))
      .execute();

    const activitiesWithParticipants = await Promise.all(
      activities.map(async (activity) => {
        const participants = await db
          .selectFrom("ActivityParticipant")
          .where("ActivityParticipant.activityId", "=", activity.activityId)
          .innerJoin("User", "User.userId", "ActivityParticipant.userId")
          .select(["ActivityParticipant.confirmed", "User.userId", "User.name"])
          .orderBy("ActivityParticipant.createdAt", "desc")
          .execute();

        return {
          ...activity,
          ActivityParticipants: participants,
        };
      })
    );

    const groupWithMembersAndActivities = {
      ...group,
      totalMembers: groupMembersCount[0].count,
      totalActivities: activitiesCount[0].count,
      GroupMembers: groupMembers,
      Activities: activitiesWithParticipants,
    };

    return groupWithMembersAndActivities;
  });

  return (await Promise.all(userWithGroups)).map((userGroupMembership) => ({
    groupId: userGroupMembership.groupId,
    name: userGroupMembership.name,
    description: userGroupMembership.description,
    totalMembers: userGroupMembership.totalMembers,
    members: userGroupMembership.GroupMembers,
    totalActivities: userGroupMembership.totalActivities,
    activities: userGroupMembership.Activities.map((activity) => ({
      activityId: activity.activityId,
      name: activity.name,
      from: activity.from,
      to: activity.to,
      emoji: activity.emoji,
      color: activity.color,
      participants: activity.ActivityParticipants.map((participant) => ({
        userId: participant.userId,
        confirmed: participant.confirmed,
        name: participant.name,
      })),
    })),
  }));
}

export default getAllGroupsForUser;
