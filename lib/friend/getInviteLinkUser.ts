import { prisma } from "../prisma-client";

async function getInviteLinkUser(inviteLink: string) {
  const user = await prisma.user.findUnique({
    where: { inviteLink },
    select: {
      userId: true,
      name: true,
      avatar: true,
    },
  });

  return user;
}

export default getInviteLinkUser;
