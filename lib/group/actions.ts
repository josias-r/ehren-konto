"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../utilities/prisma-client";
import createAuthProtectedAction from "../createAuthProtectedAction";

interface CreateGroupArgs {
  name: string;
  description: string;
  members: number[];
}

export const createGroup = createAuthProtectedAction(
  async (loggedInUserId, { name, description, members }: CreateGroupArgs) => {
    const createdGroup = await prisma.group.create({
      data: {
        name,
        description,
        GroupMembers: {
          create: [
            ...members.map((userId) => ({ userId })),
            // Add the creator to the group
            { userId: loggedInUserId },
          ],
        },
      },
    });

    revalidatePath("/groups");

    return createdGroup.groupId;
  }
);

interface UpdateGroupArgs {
  groupId: number;
  name?: string;
  description?: string;
}

export const updateGroup = createAuthProtectedAction(
  async (loggedInUserId, { groupId, name, description }: UpdateGroupArgs) => {
    const updatedGroup = await prisma.group.update({
      where: { groupId },
      data: {
        name,
        description,
      },
    });
    revalidatePath("/groups");
    return updatedGroup.groupId;
  }
);

interface DeleteGroupArgs {
  groupId: number;
}

export const deleteGroup = createAuthProtectedAction(
  async (loggedInUserId, { groupId }: DeleteGroupArgs) => {
    await prisma.group.delete({ where: { groupId } });
    revalidatePath("/groups");
  }
);

interface AddGroupMembersArgs {
  groupId: number;
  members: number[];
}

export const addGroupMembers = createAuthProtectedAction(
  async (loggedInUserId, { groupId, members }: AddGroupMembersArgs) => {
    await prisma.group.update({
      where: { groupId },
      data: {
        GroupMembers: {
          create: members.map((userId) => ({ userId })),
        },
      },
    });
    revalidatePath("/groups");
  }
);
