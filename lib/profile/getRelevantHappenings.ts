import { prisma } from "../prisma-client";

async function getRelevantHappenings(userId: string) {
  const relevantHappenings = await prisma.happening.findMany({
    where: {
      OR: [
        {
          RelatedActivity: {
            Group: {
              GroupMembers: {
                some: {
                  User: {
                    userId: userId,
                  },
                },
              },
            },
          },
        },
        {
          RelatedGroup: {
            GroupMembers: {
              some: {
                User: {
                  userId: userId,
                },
              },
            },
          },
        },
        {
          RelatedUser: {
            userId: userId,
          },
        },
      ],
    },
    select: {
      happeningsId: true,
      type: true,
      createdAt: true,
      happeningData: true,
      RelatedActivity: {
        select: {
          activityId: true,
          name: true,
          emoji: true,
          color: true,
          Group: {
            select: {
              groupId: true,
              name: true,
            },
          },
          from: true,
          ActivityParticipants: {
            select: {
              userId: true,
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
      },
      RelatedGroup: {
        select: {
          groupId: true,
          name: true,
        },
      },
      RelatedUser: {
        select: {
          userId: true,
          name: true,
          avatar: true,
          nick: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return relevantHappenings;
}

type RelevantHappeningsPromise = ReturnType<typeof getRelevantHappenings>;
//  infer type inside promise
export type RelevantHappenings = RelevantHappeningsPromise extends Promise<
  infer T
>
  ? T
  : never;

export default getRelevantHappenings;
