import { useCallback } from "react";
import { useLoadingToast } from "./use-loading-toast";
import { APIError } from "@/app/api/handlers/handleNextError";
import isApiError from "@/app/api/handlers/isApiError";
import isNotApiError, {
  RemoveApiError,
} from "@/app/api/handlers/isNotApiError";

function useApiLoadingToast() {
  const { loadingToast, errorToast } = useLoadingToast();

  const apiLoadingToast = useCallback(
    async <TResponse extends APIError | unknown>(
      apiCall: () => Promise<TResponse>,
      {
        loadingMessage,
        defaultErrorMessage,
        getAPIErrorMessage = (apiErr: APIError) => apiErr.error.message,
        onSuccess,
      }: {
        loadingMessage: string;
        defaultErrorMessage: string;
        getAPIErrorMessage?: (error: APIError) => string;
        onSuccess?: (
          response: RemoveApiError<Awaited<TResponse>>
        ) => void | Promise<void>;
      }
    ) => {
      const { dismissLoadingToast } = loadingToast(loadingMessage);
      try {
        const response = await apiCall();

        if (isApiError(response)) {
          errorToast(getAPIErrorMessage(response));
        } else if (isNotApiError(response)) {
          await onSuccess?.(response);
        } else {
          throw new Error("Invalid response");
        }
      } catch (error) {
        errorToast(defaultErrorMessage);
      } finally {
        dismissLoadingToast();
      }
    },
    [errorToast, loadingToast]
  );

  return { apiLoadingToast };
}

export default useApiLoadingToast;
