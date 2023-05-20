import { prisma } from "@/lib/prisma-client";

interface GetFriendshipExistsArgs {
  user1Id: string;
  user2Id: string;
}

async function getFriendshipExists({
  user1Id,
  user2Id,
}: GetFriendshipExistsArgs) {
  const friendshipExists = await prisma.friendship.findFirst({
    where: {
      OR: [
        { incomingUserId: user1Id, outgoingUserId: user2Id },
        { incomingUserId: user2Id, outgoingUserId: user1Id },
      ],
    },
    select: { friendshipId: true },
  });

  return !!friendshipExists;
}

export default getFriendshipExists;
