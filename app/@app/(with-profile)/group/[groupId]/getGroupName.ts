import { getUserId } from "@/app/(auth)/getUserId";
import { db } from "@/lib/kysely-client";

interface GetGroupNameArgs {
  groupId: number;
}

async function getGroupName({ groupId }: GetGroupNameArgs) {
  const userId = getUserId();
  const group = await db
    .selectFrom("Group")
    .innerJoin("GroupMember", "Group.groupId", "GroupMember.groupId")
    .where("Group.groupId", "=", groupId)
    .where("GroupMember.userId", "=", userId)
    .select(["Group.name"])
    .executeTakeFirstOrThrow();

  return group;
}

export default getGroupName;
