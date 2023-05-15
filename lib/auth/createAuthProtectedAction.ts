"use server";

import { validateCookieToken } from "./validateCookieToken";

function createAuthProtectedAction<
  TArgsShape extends any[],
  TReturnShape extends any
>(
  method: (loggedInUserId: string, ...args: TArgsShape) => Promise<TReturnShape>
) {
  return async (...args: TArgsShape) => {
    const isLoggedIn = validateCookieToken();
    if (isLoggedIn === false) {
      throw new Error("Not logged in");
    }
    return await method(isLoggedIn.userId, ...args);
  };
}

export default createAuthProtectedAction;
