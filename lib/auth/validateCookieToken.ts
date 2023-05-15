import { cookies } from "next/headers";
import { validateToken } from "./validateToken";

export function validateCookieToken() {
  // if (Math.random() < 0.0001) {
  //   return false;
  // }
  // return { userId: "1" };

  const token = cookies().get("token");
  if (!token?.value) {
    return false;
  }
  const validatedToken = validateToken(token.value);

  return validatedToken;
}
