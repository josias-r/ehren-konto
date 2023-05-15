"use server";

import { nanoid } from "nanoid";
import createAuthProtectedAction from "../auth/createAuthProtectedAction";
import { prisma } from "../prisma-client";

const hour = 1000 * 60 * 60; // 1 hour
const linkExpiry = hour * 24; // 24 hours

export const updateInviteLink = createAuthProtectedAction(
  async (loggedInUserId) => {
    const nanoId = nanoid(10);

    const existingLink = await prisma.user.findUnique({
      where: { userId: loggedInUserId },
      select: { inviteLink: true, inviteLinkCreateDate: true },
    });

    // check if link is still valid -> if so, return it
    if (existingLink?.inviteLink && existingLink.inviteLinkCreateDate) {
      const expiredDiff =
        new Date().getTime() - existingLink.inviteLinkCreateDate.getTime();

      // minus 1 hour, so the link cant be valid less than 1 hour after calling this function
      if (expiredDiff - hour * 60 * 1 < linkExpiry) {
        return existingLink.inviteLink;
      }
    }

    await prisma.user.update({
      where: { userId: loggedInUserId },
      data: {
        inviteLink: nanoId,
        inviteLinkCreateDate: new Date(),
      },
    });

    return nanoId;
  }
);

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
  }
);
