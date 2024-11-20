import { AxiosError } from "axios";

export enum ApiErrorType {
  ForbiddenError = "FORBIDDEN",
  NotFoundError = "NOT_FOUND",
  ValidationError = "VALIDATION_ERROR",
  UnknownError = "UNKNOWN",
}

interface FetchErrorResponse {
  response?: {
    status?: number; // status can be undefined
    data?: {
      errors?: { message: string }[];
    };
  };
}

export default function apiErrorHandler(error: unknown) {
  // Handling Axios error
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data;

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

    if (status && status >= 400 && status < 500) {
      return {
        type: ApiErrorType.ValidationError,
        message: responseData?.message || "Validation error occurred.",
      };
    }

    return {
      type: ApiErrorType.UnknownError,
      message:
        responseData?.message ||
        "An unexpected error occurred. Please try again.",
    };
  }

  // Handling fetch errors
  if (error instanceof Error && "message" in error) {
    // Check if error contains a response status and message
    if (error.message.includes("Failed to fetch")) {
      return {
        type: ApiErrorType.UnknownError,
        message: "Network error. Please check your connection.",
      };
    }

    // Check for specific error response from the fetch API
    const fetchError = error as FetchErrorResponse;
    if (fetchError.response?.data?.errors) {
      const message =
        fetchError.response.data.errors[0]?.message ||
        "Unknown error occurred.";
      return {
        type: ApiErrorType.UnknownError,
        message: message,
      };
    }
  }

  // Fallback for unknown errors
  return {
    type: ApiErrorType.UnknownError,
    message: "An unexpected error occurred. Please try again.",
  };
}
