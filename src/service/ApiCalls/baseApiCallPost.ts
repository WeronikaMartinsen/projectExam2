import { baseUrl } from "./Endpoints";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// This remains the same
export async function apiRequest<T, R>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: T,
  token?: string
): Promise<ApiResponse<R>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Include token if available
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }), // Include body if method is POST or PUT
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: ApiResponse<R> = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
