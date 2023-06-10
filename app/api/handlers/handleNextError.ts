import httpErrors from "http-errors";
import { NextResponse } from "next/server";

export type APIError = {
  error: {
    status: number;
    message: string;
  };
};

function handleNextError(error: unknown) {
  // console.error(error);

  if (httpErrors.isHttpError(error)) {
    return NextResponse.json<APIError>(
      {
        error: {
          status: error.status,
          message: error.message,
        },
      },
      {
        status: error.status,
      }
    );
  }

  return NextResponse.json<APIError>(
    {
      error: {
        status: 500,
        message: "Internal Server Error",
      },
    },
    {
      status: 500,
    }
  );
}

export default handleNextError;
