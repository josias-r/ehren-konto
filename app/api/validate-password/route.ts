import { NextResponse } from "next/server";
import passwordRules from "./passwordRules";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password")?.trim();

  if (password) {
    const passwordValidationErrors = passwordRules(password);

    if (passwordValidationErrors) {
      return NextResponse.json({
        data: passwordValidationErrors,
      });
    }
    return NextResponse.json({
      data: {
        result: "password-valid",
      },
    });
  }

  return NextResponse.json({
    data: {
      result: "no-pw-provided",
    },
  });
}
