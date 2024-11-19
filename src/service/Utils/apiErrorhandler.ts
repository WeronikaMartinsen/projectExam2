import { AxiosError } from "axios";

export enum ApiErrorType {
  NetworkError = "NETWORK_ERROR",
  ServerError = "SERVER_ERROR",
  ValidationError = "VALIDATION_ERROR",
  NotFoundError = "NOT_FOUND",
  UnauthorizedError = "UNAUTHORIZED",
  AccountExistsError = "ACCOUNT_EXISTS",
  IncorrectPasswordError = "INCORRECT_PASSWORD",
  ForbiddenError = "FORBIDDEN",
  UnknownError = "UNKNOWN_ERROR",
}

interface ApiError {
  type: ApiErrorType;
  message: string;
}

const apiErrorHandler = (error: unknown): ApiError => {
  console.error("Error received:", error);

  if (error instanceof AxiosError) {
    const { response } = error;

    // Network errors
    if (!response) {
      return {
        type: ApiErrorType.NetworkError,
        message: "Network error: Please check your internet connection.",
      };
    }

    const apiMessage = response.data?.message || "";

    const errorMap: Record<number, ApiError> = {
      400: {
        type: ApiErrorType.ValidationError,
        message: apiMessage || "Invalid request data. Please check your input.",
      },
      401: {
        type: ApiErrorType.UnauthorizedError,
        message: "Unauthorized: Please log in.",
      },
      403: {
        type: ApiErrorType.ForbiddenError,
        message: "Access denied: You do not have permission.",
      },
      404: {
        type: ApiErrorType.NotFoundError,
        message: "Requested resource not found.",
      },
      409: {
        type: apiMessage.includes("already exists")
          ? ApiErrorType.AccountExistsError
          : ApiErrorType.UnknownError,
        message:
          apiMessage || "Conflict error. Please verify your request details.",
      },
      500: {
        type: ApiErrorType.ServerError,
        message: "Server error: Please try again later.",
      },
    };

    return (
      errorMap[response.status] || {
        type: ApiErrorType.UnknownError,
        message: apiMessage || "An unknown error occurred. Please try again.",
      }
    );
  }

  return {
    type: ApiErrorType.UnknownError,
    message: "An unexpected error occurred. Please try again.",
  };
};

export default apiErrorHandler;
