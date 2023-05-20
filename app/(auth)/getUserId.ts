import "server-only";

import { validateCookieToken } from "./validateCookieToken";

export function getUserId() {
  const token = validateCookieToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return token.userId;
}
