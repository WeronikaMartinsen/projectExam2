import { baseUrl, apiKeyUrl } from "./Endpoints";
import apiErrorHandler from "../Utils/apiErrorhandler";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Makes an API request and handles responses, including errors.
 *
 * @template T - The type of the request body (if applicable).
 * @template R - The type of the response data.
 *
 * @param {string} endpoint - The API endpoint to call (relative to the base URL).
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method - The HTTP method for the request.
 * @param {T} [body] - Optional request body for methods like POST or PUT.
 * @param {string} [token] - Optional authorization token for secured endpoints.
 *
 * @returns {Promise<ApiResponse<R>>} A promise that resolves to the API response.
 *
 * @throws {Error} Throws an error if the API request fails or the response status is not OK.
 *
 * @example
 * // Example usage for a GET request:
 * const response = await apiRequest<null, User>("/users/123", "GET", undefined, "auth_token");
 * console.log(response.data);
 *
 * @example
 * // Example usage for a POST request:
 * const requestBody = { name: "New Venue", location: "City Center" };
 * const response = await apiRequest<VenueCreate, Venue>("/venues", "POST", requestBody, "auth_token");
 * console.log(response.data);
 */
export async function apiRequest<T, R>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: T,
  token?: string
): Promise<ApiResponse<R>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": apiKeyUrl,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    let responseBody;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = null;
    }

    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          errors:
            responseBody?.errors || responseBody?.message || "Unknown error",
        })
      );
    }

    return responseBody as ApiResponse<R>;
  } catch (error) {
    const handledError = apiErrorHandler(error);
    throw new Error(handledError.message);
  }
}
