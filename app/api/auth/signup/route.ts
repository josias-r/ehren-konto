import * as yup from "yup";
import parseAndValidateJSONBody from "../../handlers/parseAndValidateJSONBody";
import handleNextError from "../../handlers/handleNextError";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import validator from "validator";
import passwordRules from "../../validate-password/passwordRules";

const schema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export type SignupPayload = yup.InferType<typeof schema>;

export async function POST(request: Request) {
  try {
    const { email, password } = await parseAndValidateJSONBody(request, schema);

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new createHttpError.BadRequest("invalid-email");
    }

    const passwordRulesError = passwordRules(password);
    if (passwordRulesError) {
      throw new createHttpError.BadRequest(passwordRulesError.error);
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
      throw new createHttpError.Conflict("user-exists");
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleNextError(error);
  }
}

export type SignupResponse = Awaited<ReturnType<typeof POST>>;
