import { prisma } from "../utilities/prisma-client";

async function getAllGroupsForUser(userId: number) {
  const userWithGroups = await prisma.user.findFirst({
    select: {
      GroupMember: {
        orderBy: {
          Group: {
            createdAt: "desc",
          },
        },
        select: {
          Group: {
            select: {
              groupId: true,
              name: true,
              description: true,
              GroupMembers: {
                orderBy: [
                  {
                    ehre: "desc",
                  },
                  {
                    User: {
                      name: "asc",
                    },
                  },
                ],
                select: {
                  role: true,
                  ehre: true,
                  User: {
                    select: {
                      avatar: true,
                      userId: true,
                      name: true,
                      nick: true,
                    },
                  },
                },
              },
              Activities: {
                orderBy: {
                  from: "asc",
                },
                select: {
                  activityId: true,
                  name: true,
                  from: true,
                  to: true,
                  emoji: true,
                  color: true,
                  ActivityParticipants: {
                    orderBy: {
                      createdAt: "desc",
                    },
                    select: {
                      confirmed: true,
                      User: {
                        select: {
                          userId: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  return userWithGroups?.GroupMember.map((userGroupMembership) => ({
    groupId: userGroupMembership.Group.groupId,
    name: userGroupMembership.Group.name,
    description: userGroupMembership.Group.description,
    members: userGroupMembership.Group.GroupMembers.map((groupMember) => ({
      userId: groupMember.User.userId,
      avatar: groupMember.User.avatar,
      role: groupMember.role,
      ehre: groupMember.ehre,
      name: groupMember.User.name,
      nick: groupMember.User.nick,
    })),
    activities: userGroupMembership.Group.Activities.map((activity) => ({
      activityId: activity.activityId,
      name: activity.name,
      from: activity.from,
      to: activity.to,
      emoji: activity.emoji,
      color: activity.color,
      participants: activity.ActivityParticipants.map((participant) => ({
        userId: participant.User.userId,
        confirmed: participant.confirmed,
      })),
    })),
  }));
}

export default getAllGroupsForUser;
