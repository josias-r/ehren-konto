import createApiClientHandler from "../../handlers/createApiClientHandler";
import { RemoveFriendPayload, RemoveFriendResponse } from "./route";

const removeFriends = createApiClientHandler<
  RemoveFriendPayload,
  RemoveFriendResponse
>("/api/friend/remove", "PATCH");

export default removeFriends;
