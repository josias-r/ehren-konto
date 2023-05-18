import "server-only";

import { cookies } from "next/headers";
import { validateToken } from "./validateToken";

export function validateCookieToken() {
  const token = cookies().get("token");
  if (!token?.value) {
    return false;
  }
  const validatedToken = validateToken(token.value);

  return validatedToken;
}
