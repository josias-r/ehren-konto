import * as yup from "yup";
import parseAndValidateJSONBody from "../../handlers/parseAndValidateJSONBody";
import handleNextError from "../../handlers/handleNextError";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const schema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export type LoginPayload = yup.InferType<typeof schema>;

export async function POST(request: Request) {
  try {
    const { email, password } = await parseAndValidateJSONBody(request, schema);

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
      throw new createHttpError.Unauthorized("invalid-credentials"); // no user found -> we don't want to leak that info
    }

    // TODO: implement email confirmation
    // if (!user.confirmedEmail) {
    //   return {
    //     error: "email-not-confirmed" as const,
    //   };
    // }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new createHttpError.Unauthorized("invalid-credentials");
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

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      // @ts-expect-error TODO: wait for nextJS fix
      expiryInSeconds: expiryInSeconds,
    });
    cookies().set({
      name: "is-logged-in",
      value: "yes",
      path: "/",
      // TODO: figure out best practice -> httpOnly because of expiry date and so FE can check if logged in
      // https://stackoverflow.com/a/9649496/9191773
      // @ts-expect-error TODO: wait for nextJS fix
      expiryInSeconds: expiryInSeconds,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return handleNextError(error);
  }
}

export type LoginResponse = Awaited<ReturnType<typeof POST>>;
