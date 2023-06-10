import "server-only";

import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getGroupForUser(groupId: number) {
  const userId = getUserId();

  const group = await db
    .selectFrom("Group")
    .where("groupId", "=", groupId)
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .where("userId", "=", userId)
          .where("groupId", "=", groupId)
      )
    )
    .select(["groupId", "name", "description"])
    .executeTakeFirst();

  return group;
}

export default getGroupForUser;
