import "server-only";

import { db } from "@/lib/kysely-client";
import { getUserId } from "@/app/(auth)/getUserId";

async function getProfileData() {
  const userId = getUserId();

  const user = await db
    .selectFrom("User")
    .where("userId", "=", userId)
    .select(["name", "nick", "avatar"])
    .executeTakeFirst();

  return user;
}

export default getProfileData;
