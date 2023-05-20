import RemoveMembersSheet from "./RemoveMembersSheet";
import getGroupWithMembers from "@/app/@app/(with-profile)/groups/members/[groupId]/getGroupWithMembers";
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
      groupMembers={members}
      groupId={parseInt(params.groupId)}
    />
  );
}

export default RemoveMembers;
