import jwt from "jsonwebtoken";

export function validateToken(token: unknown, silent = false) {
  if (typeof token !== "string") {
    return false;
  }

  const cleanToken = token.replace("Bearer ", "");

  try {
    const decoded: any = jwt.verify(
      cleanToken,
      // TODO: use env var secret
      "ssshhh"
    );

    if (
      typeof decoded["username"] !== "string" ||
      typeof decoded["email"] !== "string" ||
      typeof decoded["id"] !== "string"
    ) {
      throw new Error("expected-specific-jwt-payload");
    }
    return {
      username: decoded["username"],
      email: decoded["email"],
      id: decoded["id"],
    };
  } catch (error) {
    if (!silent) {
      console.error(error);
    }
    return false;
  }
}

export type ValidatedUser = ReturnType<typeof validateToken>;
