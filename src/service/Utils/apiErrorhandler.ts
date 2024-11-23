import { AxiosError } from "axios";

export enum ApiErrorType {
  ForbiddenError = "FORBIDDEN",
  NotFoundError = "NOT_FOUND",
  ValidationError = "VALIDATION_ERROR",
  UnknownError = "UNKNOWN",
}

export default function apiErrorHandler(error: unknown) {
  // Handling Axios error
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    if (status !== undefined) {
      if (status === 403) {
        const errorMessage =
          responseData?.errors?.[0]?.message ||
          "Access denied. You do not have the required permissions.";
        return {
          type: ApiErrorType.ForbiddenError,
          message: errorMessage,
        };
      }

      if (status === 404) {
        return {
          type: ApiErrorType.NotFoundError,
          message: "Resource not found.",
        };
      }

      if (status >= 400 && status < 500) {
        const errorMessage =
          responseData?.errors?.[0]?.message ||
          responseData?.message ||
          "Validation error occurred.";
        return {
          type: ApiErrorType.ValidationError,
          message: errorMessage,
        };
      }
    }
    return {
      type: ApiErrorType.UnknownError,
      message:
        responseData?.errors?.[0]?.message ||
        responseData?.message ||
        "An unexpected error occurred. Please try again.",
    };
  }

  if (error instanceof Error && "message" in error) {
    if (error.message.includes("Failed to fetch")) {
      return {
        type: ApiErrorType.UnknownError,
        message: "Network error. Please check your connection.",
      };
    }
  }

  return {
    type: ApiErrorType.UnknownError,
    message: "An unexpected error occurred. Please try again.",
  };
}
