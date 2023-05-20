import "server-only";

import { prisma } from "@/lib/prisma-client";

async function getAllGroupsForUser(userId: string) {
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
              _count: {
                select: {
                  GroupMembers: true,
                  Activities: true,
                },
              },
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
                take: 5,
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
                          name: true,
                        },
                      },
                    },
                  },
                },
                take: 6,
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
    totalMembers: userGroupMembership.Group._count.GroupMembers,
    members: userGroupMembership.Group.GroupMembers.map((groupMember) => ({
      userId: groupMember.User.userId,
      avatar: groupMember.User.avatar,
      role: groupMember.role,
      ehre: groupMember.ehre,
      name: groupMember.User.name,
      nick: groupMember.User.nick,
    })),
    totalActivities: userGroupMembership.Group._count.Activities,
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
        name: participant.User.name,
      })),
    })),
  }));
}

export default getAllGroupsForUser;
