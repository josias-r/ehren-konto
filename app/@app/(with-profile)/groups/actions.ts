"use server";

import { prisma } from "@/lib/prisma-client";
import createAuthProtectedAction from "../../../(auth)/createAuthProtectedAction";

interface CreateGroupArgs {
  name: string;
  description: string;
  members: string[];
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

    return updatedGroup.groupId;
  }
);

interface DeleteGroupArgs {
  groupId: number;
}

export const deleteGroup = createAuthProtectedAction(
  async (loggedInUserId, { groupId }: DeleteGroupArgs) => {
    await prisma.group.delete({ where: { groupId } });
  }
);

interface AddGroupMembersArgs {
  groupId: number;
  members: string[];
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
  }
);

interface RemoveGroupMembersArgs {
  groupId: number;
  members: string[];
}

export const removeGroupMembers = createAuthProtectedAction(
  async (loggedInUserId, { groupId, members }: RemoveGroupMembersArgs) => {
    await prisma.group.update({
      where: { groupId },
      data: {
        GroupMembers: {
          deleteMany: members.map((userId) => ({ userId })),
        },
      },
    });
  }
);

interface LeaveGroupArgs {
  groupId: number;
}

export const leaveGroup = createAuthProtectedAction(
  async (loggedInUserId, { groupId }: LeaveGroupArgs) => {
    await prisma.groupMember.delete({
      where: { userId_groupId: { groupId, userId: loggedInUserId } },
    });
  }
);
