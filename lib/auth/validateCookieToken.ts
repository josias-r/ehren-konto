import { cookies } from "next/headers";
import { validateToken } from "./validateToken";

export async function validateCookieToken() {
  const token = cookies().get("token");
  if (!token?.value) {
    return false;
  }
  const validatedToken = await validateToken(token.value);

  return validatedToken;
}
