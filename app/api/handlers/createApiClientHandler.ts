function createApiClientHandler<
  TPayloadShape extends {},
  TResponseShape extends unknown
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
