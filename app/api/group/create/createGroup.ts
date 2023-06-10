import createApiClientHandler from "../../handlers/createApiClientHandler";
import { CreateGroupPayload, CreateGroupResponse } from "./route";

const createGroup = createApiClientHandler<
  CreateGroupPayload,
  CreateGroupResponse
>("/api/group/create", "PUT");

export default createGroup;
