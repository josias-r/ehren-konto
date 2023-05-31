import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

async function getGroupWithMembers(groupId: number) {
  const userId = getUserId();

  const groupMembers = await db
    .selectFrom("GroupMember")
    .where("groupId", "=", groupId)
    .where(({ exists, selectFrom }) =>
      exists(
        selectFrom("GroupMember")
          .where("userId", "=", userId)
          .where("groupId", "=", groupId)
      )
    )
    .innerJoin("User", "User.userId", "GroupMember.userId")
    .select([
      "User.userId",
      "role",
      "ehre",
      "User.avatar",
      "User.name",
      "User.nick",
    ])
    .execute();

  return groupMembers;
}

type GroupMembersReturn = ReturnType<typeof getGroupWithMembers>;

export type GroupMembers = GroupMembersReturn extends Promise<infer U>
  ? U
  : never;

export default getGroupWithMembers;
