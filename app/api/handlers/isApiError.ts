import { APIError } from "./handleNextError";

function isApiError(error: any): error is APIError {
  return "error" in error;
}

export default isApiError;
