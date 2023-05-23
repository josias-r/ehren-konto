"use server";

import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getAllFriendsForUser() {
  const userId = getUserId();

  const friendships = await db
    .selectFrom("Friendship")
    .where("Friendship.outgoingUserId", "=", userId)
    .innerJoin(
      "User as FriendUser",
      "FriendUser.userId",
      "Friendship.incomingUserId"
    )
    .select([
      "FriendUser.userId",
      "FriendUser.name",
      "FriendUser.nick",
      "FriendUser.avatar",
    ])
    .union(
      db
        .selectFrom("Friendship")
        .where("Friendship.incomingUserId", "=", userId)
        .innerJoin(
          "User as FriendUser",
          "FriendUser.userId",
          "Friendship.outgoingUserId"
        )
        .select([
          "FriendUser.userId",
          "FriendUser.name",
          "FriendUser.nick",
          "FriendUser.avatar",
        ])
    )
    .orderBy("name", "asc")
    .execute();

  const friendshipsWithGroups = await Promise.all(
    friendships.map(async (friendship) => {
      const relevantGroups = db
        .selectFrom("Group")
        // only groups where the logged in user is a member
        .innerJoin(
          "GroupMember as UserGroupMember",
          "Group.groupId",
          "UserGroupMember.groupId"
        )
        .where("UserGroupMember.userId", "=", userId);

      const friendGroups = await relevantGroups
        .leftJoin("GroupMember", "GroupMember.groupId", "Group.groupId")
        .where("GroupMember.userId", "=", friendship.userId)
        .select(["Group.groupId", "Group.name"])
        .execute();
      return {
        ...friendship,
        groups: friendGroups,
      };
    })
  );

  return friendshipsWithGroups;
}

type GetAllFriendsForUserReturn = ReturnType<typeof getAllFriendsForUser>;
type GetAllFriendsForUser = GetAllFriendsForUserReturn extends Promise<infer U>
  ? U
  : never;
export type UserFriends = GetAllFriendsForUser;

export default getAllFriendsForUser;
