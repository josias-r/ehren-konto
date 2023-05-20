import { db } from "@/lib/kysely-client";

interface GetFriendshipExistsArgs {
  user1Id: string;
  user2Id: string;
}

async function getFriendshipExists({
  user1Id,
  user2Id,
}: GetFriendshipExistsArgs) {
  const friendshipExists = await db
    .selectFrom("Friendship")
    .where(({ or, and, cmpr }) =>
      or([
        and([
          cmpr("incomingUserId", "=", user1Id),
          cmpr("outgoingUserId", "=", user2Id),
        ]),
        and([
          cmpr("incomingUserId", "=", user2Id),
          cmpr("outgoingUserId", "=", user1Id),
        ]),
      ])
    )
    .select(["friendshipId"])
    .executeTakeFirst();

  return !!friendshipExists;
}

export default getFriendshipExists;
