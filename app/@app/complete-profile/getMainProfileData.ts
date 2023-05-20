import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getMainProfileData() {
  const userId = getUserId();

  const user = await db
    .selectFrom("User")
    .where("User.userId", "=", userId)
    .select([
      "User.name",
      "User.nick",
      // "User.confirmedEmail",
    ])
    .executeTakeFirst();

  return user;
}

export default getMainProfileData;
