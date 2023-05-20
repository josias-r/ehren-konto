import { getUserId } from "@/lib/auth/getUserId";
import { prisma } from "@/lib/prisma-client";

async function getGroupWithMembers(groupId: number) {
  const userId = getUserId();
  const groupMembers = await prisma.group.findFirst({
    where: {
      groupId,
      GroupMembers: {
        some: {
          userId,
        },
      },
    },
    select: {
      groupId: true,
      GroupMembers: {
        orderBy: {
          ehre: "desc",
        },
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
    },
  });

  return groupMembers;
}

type GroupMembersReturn = ReturnType<typeof getGroupWithMembers>;

export type GroupMembers = GroupMembersReturn extends Promise<infer U>
  ? U
  : never;

export default getGroupWithMembers;
