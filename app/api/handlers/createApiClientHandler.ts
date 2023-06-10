import { NextResponse } from "next/server";

function createApiClientHandler<
  TPayloadShape extends {},
  TNextResponseShape extends NextResponse,
  TResponseShape = TNextResponseShape extends NextResponse<infer T> ? T : never
>(endpoint: string, method: "POST" | "PATCH") {
  return async (payload: TPayloadShape) => {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json: TResponseShape = await response.json();

    return json;
  };
}

export default createApiClientHandler;
