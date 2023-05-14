"use server";

import { prisma } from "../utilities/prisma-client";

interface CreateGroupArgs {
  name: string;
  description: string;
  members: number[];
}

export async function createGroup({
  name,
  description,
  members,
}: CreateGroupArgs) {
  const createdGroup = await prisma.group.create({
    data: {
      name,
      description,
      GroupMembers: { create: members.map((userId) => ({ userId })) },
    },
  });

  return createdGroup.groupId;
}
