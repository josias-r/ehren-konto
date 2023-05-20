import { prisma } from "../../../lib/prisma-client";

async function getMainProfileData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      name: true,
      nick: true,
      // confirmedEmail: true,
    },
  });

  return user;
}

export default getMainProfileData;
