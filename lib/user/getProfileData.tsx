import { prisma } from "../prisma-client";

async function geProfileData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      name: true,
      nick: true,
      avatar: true,
    },
  });

  return user;
}

export default geProfileData;
