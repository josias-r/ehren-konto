import getAllFriendsForUser from "../../friends/getAllFriendsForUser";
import CreateGroupSheet from "./CreateGroupSheet";

async function CreateGroup() {
  const userFriends = await getAllFriendsForUser();
  return <CreateGroupSheet userFriends={userFriends} />;
}

export default CreateGroup;
