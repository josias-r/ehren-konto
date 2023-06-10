import { NextResponse } from "next/server";

function createApiClientHandler<
  TPayloadShape extends {},
  TNextResponseShape extends NextResponse,
  TResponseShape = TNextResponseShape extends NextResponse<infer T> ? T : never
>(endpoint: string, method: "POST" | "PATCH" | "PUT") {
  return async (payload: TPayloadShape) => {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if ("error" in json) {
      throw new Error("API ERROR: " + json.error);
    }

    return json as TResponseShape;
  };
}

export default createApiClientHandler;
