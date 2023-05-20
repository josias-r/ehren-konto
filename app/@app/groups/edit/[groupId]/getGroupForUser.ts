import "server-only";

import { getUserId } from "@/app/(auth)/getUserId";
import { prisma } from "@/lib/prisma-client";

async function getGroupForUser(groupId: number) {
  const userId = getUserId();
  const group = await prisma.group.findFirst({
    where: {
      groupId: groupId,
      GroupMembers: {
        some: {
          userId: userId,
        },
      },
    },
    select: {
      groupId: true,
      name: true,
      description: true,
    },
  });

  return group;
}

export default getGroupForUser;
