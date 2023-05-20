import getAllFriendsForUser from "@/app/@app/friends/getAllFriendsForUser";
import AddMembersSheet from "./AddMembersSheet";
import { getUserId } from "@/lib/auth/getUserId";

async function AddMembers({
  params,
}: {
  params: {
    groupId: string;
  };
}) {
  const userId = getUserId();
  const { userGroups, userFriends } = await getAllFriendsForUser(userId);
  return (
    <AddMembersSheet
      userFriends={userFriends}
      userGroups={userGroups}
      groupId={parseInt(params.groupId)}
    />
  );
}

export default AddMembers;
