import { AxiosError } from "axios";

export enum ApiErrorType {
  ValidationError = "Validation Error",
  NotFoundError = "Not Found Error",
  ServerError = "Server Error",
  UnknownError = "Unknown Error",
}

export default function apiErrorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    if (
      status === 400 &&
      responseData?.errors &&
      responseData.errors[0]?.message
    ) {
      const firstMessage = responseData.errors[0].message;
      return {
        type: ApiErrorType.ValidationError,
        message: firstMessage,
      };
    }

    if (status === 404) {
      return {
        type: ApiErrorType.NotFoundError,
        message: "Resource not found.",
      };
    }
    if (status === 500) {
      return {
        type: ApiErrorType.ServerError,
        message: "Internal server error.",
      };
    }
    return {
      type: ApiErrorType.UnknownError,
      message: responseData?.statusText || "Unknown error occurred.",
    };
  }

  if (error instanceof Error) {
    return {
      type: ApiErrorType.UnknownError,
      message: error.message,
    };
  }

  return {
    type: ApiErrorType.UnknownError,
    message: "An unexpected error occurred.",
  };
}
