import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getGroupName(groupId: number) {
  const userId = getUserId();
  const group = await db
    .selectFrom("Group")
    .where("groupId", "=", groupId)
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .where("GroupMember.groupId", "=", groupId)
          .where("GroupMember.userId", "=", userId)
      )
    )
    .select(["Group.name"])
    .executeTakeFirstOrThrow();

  return group;
}

export default getGroupName;
