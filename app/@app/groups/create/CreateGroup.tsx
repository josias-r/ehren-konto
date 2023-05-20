import getAllFriendsForUser from "../../friends/getAllFriendsForUser";
import CreateGroupSheet from "./CreateGroupSheet";

async function CreateGroup() {
  const { userFriends, userGroups } = await getAllFriendsForUser();
  return <CreateGroupSheet userFriends={userFriends} userGroups={userGroups} />;
}

export default CreateGroup;
