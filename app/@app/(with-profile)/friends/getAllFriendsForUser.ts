"use server";

import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getAllFriendsForUser() {
  const userId = getUserId();

  const userSelectData = {
    userId: true,
    name: true,
    nick: true,
    avatar: true,
    GroupMember: {
      select: {
        Group: {
          select: {
            groupId: true,
          },
        },
      },
    },
  };

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
      const friendGroups = await db
        .selectFrom("GroupMember")
        .where("GroupMember.userId", "=", friendship.userId)
        .innerJoin("Group", "Group.groupId", "GroupMember.groupId")
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
