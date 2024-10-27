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
  console.log("Request headers:", headers);

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
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
