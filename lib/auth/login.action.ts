"use server";

import validator from "validator";
import bcrypt from "bcrypt";

interface SignInArgs {
  email: string;
  password: string;
}

export async function login({ email, password }: SignInArgs) {
  const isEmail = validator.isEmail(email);

  if (!isEmail) {
    throw new Error("Invalid email");
  }
}
