import getAllFriendsForUser from "@/app/@app/friends/getAllFriendsForUser";
import RemoveMembersSheet from "./RemoveMembersSheet";
import { getUserId } from "@/lib/auth/getUserId";
import getGroupWithMembers from "@/app/@app/groups/members/[groupId]/getGroupWithMembers";
import { notFound } from "next/navigation";

async function RemoveMembers({
  params,
}: {
  params: {
    groupId: string;
  };
}) {
  const members = await getGroupWithMembers(parseInt(params.groupId));

  if (!members) {
    return notFound();
  }
  return (
    <RemoveMembersSheet
      groupMembers={members.GroupMembers}
      groupId={parseInt(params.groupId)}
    />
  );
}

export default RemoveMembers;
