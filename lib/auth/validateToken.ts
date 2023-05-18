import jwt from "jsonwebtoken";

export function validateToken(token: unknown) {
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
      typeof decoded["email"] !== "string" ||
      typeof decoded["id"] !== "string"
    ) {
      throw new Error("expected-specific-jwt-payload");
    }
    return {
      email: decoded["email"],
      userId: decoded["id"],
    };
  } catch (error) {
    console.error("failed to verify JWT");
    return false;
  }
}

export type ValidatedUser = ReturnType<typeof validateToken>;
