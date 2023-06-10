import createApiClientHandler from "../../handlers/createApiClientHandler";
import { SignupPayload, SignupResponse } from "./route";

const signup = createApiClientHandler<SignupPayload, SignupResponse>(
  "/api/auth/signup",
  "POST"
);

export default signup;
