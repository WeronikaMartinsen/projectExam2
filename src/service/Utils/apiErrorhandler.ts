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
  if (error instanceof AxiosError) {
    const { response } = error;

    if (!response) {
      return {
        type: ApiErrorType.NetworkError,
        message: "Network error: Please check your internet connection.",
      };
    }

    const apiMessage = response.data?.message;

    switch (response.status) {
      case 400:
        return {
          type: ApiErrorType.ValidationError,
          message: apiMessage || "Invalid request data. Please check your input.",
        };
      case 401:
        return {
          type: ApiErrorType.UnauthorizedError,
          message: "Unauthorized: Please log in.",
        };
      case 403:
        return {
          type: ApiErrorType.ForbiddenError,
          message: "Access denied: You do not have permission.",
        };
      case 404:
        return {
          type: ApiErrorType.NotFoundError,
          message: "Requested resource not found.",
        };
      case 409:
        if (apiMessage?.includes("already exists")) {
          return {
            type: ApiErrorType.AccountExistsError,
            message: "Account already exists. Try logging in.",
          };
        }
        break;
      case 500:
        return {
          type: ApiErrorType.ServerError,
          message: "Server error: Please try again later.",
        };
      default:
        return {
          type: ApiErrorType.UnknownError,
          message: apiMessage || "An unknown error occurred. Please try again.",
        };
    }
  }

  return {
    type: ApiErrorType.UnknownError,
    message: "An unknown error occurred. Please try again.",
  };
};

export default apiErrorHandler;
