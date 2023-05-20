import { prisma } from "@/lib/prisma-client";
import isUserInviteLinkNotExpired from "./isUserInviteLinkNotExpired";

async function getInviteLinkUser(inviteLink: string) {
  const user = await prisma.user.findUnique({
    where: { inviteLink },
    select: {
      userId: true,
      name: true,
      avatar: true,
      inviteLinkCreateDate: true,
    },
  });

  if (isUserInviteLinkNotExpired(user?.inviteLinkCreateDate)) {
    return user;
  }
}

export default getInviteLinkUser;
