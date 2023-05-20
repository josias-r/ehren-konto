"use server";

import bcrypt from "bcrypt";
import validator from "validator";
import passwordValidator from "password-validator";
import { prisma } from "../../../lib/prisma-client";

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces
// .is()
// .not()
// .oneOf(['Passw0rd', 'Password123']);

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

  const pwValidationMessages = schema.validate(password, { details: true });

  if (Array.isArray(pwValidationMessages) && pwValidationMessages.length) {
    return {
      error: "insufficient-password" as const,
      pwValidationMessages: pwValidationMessages.map((result) =>
        result.message.replace("The string", "The password")
      ) as string[],
    };
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
