import createApiClientHandler from "../../handlers/createApiClientHandler";
import { LoginPayload, LoginResponse } from "./route";

const login = createApiClientHandler<LoginPayload, LoginResponse>(
  "/api/auth/login",
  "POST"
);

export default login;
