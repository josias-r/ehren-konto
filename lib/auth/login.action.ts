"use server";

import bcrypt from "bcrypt";
import { prisma } from "../prisma-client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface SignInArgs {
  email: string;
  password: string;
}

export async function login({ email, password }: SignInArgs) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      userId: true,
      passwordHash: true,
      confirmedEmail: true,
      email: true,
    },
  });

  if (!user) {
    return {
      error: "invalid-credentials" as const, // no user found -> we don't want to leak that info
    };
  }

  // TODO: implement email confirmation
  // if (!user.confirmedEmail) {
  //   return {
  //     error: "email-not-confirmed" as const,
  //   };
  // }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return {
      error: "invalid-credentials" as const,
    };
  }

  // TODO: fine tune
  const expiryInSeconds = 60 * 60 * 24;

  const token = jwt.sign(
    {
      id: user.userId,
      email: user.email,
    },
    // TODO: use env var secret
    "ssshhh",
    { expiresIn: expiryInSeconds }
  );

  // @ts-expect-error TODO: wait for nextJS fix
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    expiryInSeconds: expiryInSeconds,
  });

  return {
    success: true,
  };
}
