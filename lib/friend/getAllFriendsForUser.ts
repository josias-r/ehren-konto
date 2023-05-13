import { prisma } from "../utilities/prisma-client";

async function getAllFriendsForUser(userId: number) {
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

  const mapFriendShip = (friendship: {
    name: string;
    userId: number;
    GroupMember: {
      Group: {
        groupId: number;
      };
    }[];
    nick: string;
    avatar: string;
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
      mapFriendShip(friendship.IncomingUser)
    ) || [];
  const incomingUserFriends =
    friendshipsWithGroup?.FriendshipIncoming.map((friendship) =>
      mapFriendShip(friendship.OutgoingUser)
    ) || [];

  const allFriends = [...outgoingUserFriends, ...incomingUserFriends];

  allFriends.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });

  return {
    userGroups,
    userFriends: allFriends,
  };
}

export default getAllFriendsForUser;
