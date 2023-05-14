"use server";

import { validateCookieToken } from "./auth.server";

function createAuthProtectedAction<
  TArgsShape extends any[],
  TReturnShape extends any
>(
  method: (loggedInUserId: number, ...args: TArgsShape) => Promise<TReturnShape>
) {
  return async (...args: TArgsShape) => {
    const isLoggedIn = await validateCookieToken();
    if (isLoggedIn === false) {
      throw new Error("Not logged in");
    }
    return await method(isLoggedIn.userId, ...args);
  };
}

export default createAuthProtectedAction;
