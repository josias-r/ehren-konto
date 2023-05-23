"use server";

import bcrypt from "bcrypt";
import validator from "validator";
import { prisma } from "@/lib/prisma-client";
import passwordRules from "../../api/validate-password/passwordRules";

interface SignInArgs {
  email: string;
  password: string;
}

export async function signup({
  email: emailArg,
  password: passwordArg,
}: SignInArgs) {
  const email = emailArg.trim();
  const password = passwordArg.trim();

  const isEmail = validator.isEmail(email);

  if (!isEmail) {
    return {
      error: "invalid-email" as const,
    };
  }

  const passwordRulesError = passwordRules(password);
  if (passwordRulesError) {
    return passwordRulesError;
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      userId: true,
    },
  });

  if (userExists) {
    return {
      error: "user-exists" as const,
    };
  }

  const hash = await bcrypt.hash(password.trim(), 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash: hash,
      name: "",
      nick: "",
    },
    select: {
      userId: true,
    },
  });

  return { success: true };
}
