import createAuthProtectedAction from "../auth/createAuthProtectedAction";
import { prisma } from "../prisma-client";
import { nanoid } from "nanoid";
import isUserInviteLinkNotExpired from "./isUserInviteLinkNotExpired";
interface CompleteProfileArgs {
  name: string;
  nick: string;
}

export const completeProfile = createAuthProtectedAction(
  async (loggedInUserId, { name, nick }: CompleteProfileArgs) => {
    await prisma.user.update({
      where: { userId: loggedInUserId },
      data: { name, nick },
    });
  }
);

export const updateInviteLink = createAuthProtectedAction(
  async (loggedInUserId) => {
    const nanoId = nanoid(10);

    const existingLink = await prisma.user.findUnique({
      where: { userId: loggedInUserId },
      select: { inviteLink: true, inviteLinkCreateDate: true },
    });

    // check if link is still valid -> if so, return it
    if (
      existingLink?.inviteLink &&
      isUserInviteLinkNotExpired(existingLink.inviteLinkCreateDate)
    ) {
      return existingLink.inviteLink;
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
