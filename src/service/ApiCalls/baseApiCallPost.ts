import { baseUrl, apiKeyUrl } from "./Endpoints";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

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
    // Sending the request to the API
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    // Handle non-OK responses by throwing an error with the status text
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse<R> = await response.json();

    console.log("API Response Data:", data);

    // Return the parsed response data
    return data;
  } catch (error) {
    // Log the error details for debugging
    console.error("API Request Error:", error);

    throw new Error(
      `API Request Failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
