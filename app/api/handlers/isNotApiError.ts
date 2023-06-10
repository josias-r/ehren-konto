import { APIError } from "./handleNextError";
import isApiError from "./isApiError";

// helper type to remove "ApiError" from union
export type RemoveApiError<T> = T extends APIError ? never : T;

function isNotApiError<TReponse extends APIError | unknown>(
  response: TReponse
): response is RemoveApiError<TReponse> {
  return !isApiError(response);
}

export default isNotApiError;
