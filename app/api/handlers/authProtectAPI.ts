import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
import createHttpError from "http-errors";

function authProtectAPI() {
  const isLoggedIn = validateCookieToken();
  if (isLoggedIn === false) {
    throw new createHttpError.Unauthorized("Not logged in");
  }

  return isLoggedIn;
}

export default authProtectAPI;
