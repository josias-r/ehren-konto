"use server";

import { prisma } from "../../lib/prisma-client";

async function getAllFriendsForUser(userId: string) {
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
  const friendshipsWithGroup = await prisma.user.findFirst({
    select: {
      GroupMember: {
        select: {
          Group: {
            select: {
              groupId: true,
              name: true,
              description: true,
            },
          },
        },
      },
      FriendshipIncoming: {
        select: {
          OutgoingUser: {
            select: {
              ...userSelectData,
            },
          },
        },
      },
      FriendshipOutgoing: {
        select: {
          IncomingUser: {
            select: {
              ...userSelectData,
            },
          },
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  const userGroups = friendshipsWithGroup?.GroupMember.map((groupMember) => ({
    groupId: groupMember.Group.groupId,
    name: groupMember.Group.name,
    description: groupMember.Group.description,
  }));

  const mapFriendShape = (friendship: {
    name: string;
    userId: string;
    GroupMember: {
      Group: {
        groupId: number;
      };
    }[];
    nick: string;
    avatar: string | null;
  }) => ({
    userId: friendship.userId,
    name: friendship.name,
    nick: friendship.nick,
    avatar: friendship.avatar,
    groups: friendship.GroupMember.map((groupMember) => ({
      groupId: groupMember.Group.groupId,
    })),
  });

  const outgoingUserFriends =
    friendshipsWithGroup?.FriendshipOutgoing.map((friendship) =>
      mapFriendShape(friendship.IncomingUser)
    ) || [];
  const incomingUserFriends =
    friendshipsWithGroup?.FriendshipIncoming.map((friendship) =>
      mapFriendShape(friendship.OutgoingUser)
    ) || [];

  const allFriends = [...outgoingUserFriends, ...incomingUserFriends];

  allFriends.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });

  return {
    userGroups: userGroups || [],
    userFriends: allFriends,
  };
}

export default getAllFriendsForUser;
