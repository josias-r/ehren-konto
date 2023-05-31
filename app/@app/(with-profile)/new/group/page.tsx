import getAllFriendsForUser from "../../friends/getAllFriendsForUser";
import CreateGroupCard from "./CreateGroupCard";

async function CreateGroupPage() {
  const userFriends = await getAllFriendsForUser();
  return <CreateGroupCard userFriends={userFriends} />;
}

export default CreateGroupPage;
