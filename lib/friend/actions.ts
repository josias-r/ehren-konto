"use server";

import createAuthProtectedAction from "../auth/createAuthProtectedAction";
import { prisma } from "../prisma-client";
import { revalidatePath } from "next/cache";

interface BefriendUserArgs {
  inviteLink: string;
}

export const befriendUser = createAuthProtectedAction(
  async (loggedInUserId, { inviteLink }: BefriendUserArgs) => {
    const inviteLinkUser = await prisma.user.findUnique({
      where: { inviteLink },
      select: { userId: true },
    });

    if (!inviteLinkUser) {
      throw new Error("User not found");
    }

    if (inviteLinkUser.userId === loggedInUserId) {
      throw new Error("You cannot befriend yourself ;)");
    }

    await prisma.friendship.create({
      data: {
        incomingUserId: inviteLinkUser.userId,
        outgoingUserId: loggedInUserId,
      },
    });

    revalidatePath("/friends");
  }
);

interface UnfriendUsersArgs {
  userIds: string[];
}

export const unfriendUsers = createAuthProtectedAction(
  async (loggedInUserId, { userIds }: UnfriendUsersArgs) => {
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          {
            outgoingUserId: loggedInUserId,
            incomingUserId: {
              in: userIds,
            },
          },
          {
            incomingUserId: loggedInUserId,
            outgoingUserId: {
              in: userIds,
            },
          },
        ],
      },
    });
    revalidatePath("/friends");
  }
);
