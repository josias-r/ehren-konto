import { validateCookieToken } from "./validateCookieToken";

export async function getUserId() {
  "use server";
  const token = await validateCookieToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return token.userId;
}
