import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getUserData() {
  const userId = getUserId();

  const user = await db
    .selectFrom("User")
    .where("userId", "=", userId)
    .select(["userId", "name", "nick", "email", "avatar"])
    .executeTakeFirstOrThrow();

  return user;
}

export default getUserData;
