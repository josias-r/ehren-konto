import createApiClientHandler from "../../handlers/createApiClientHandler";
import { EditActivityPayload, EditActivityResponse } from "./route";

const editActivity = createApiClientHandler<
  EditActivityPayload,
  EditActivityResponse
>("/api/activity/edit", "POST");

export default editActivity;
