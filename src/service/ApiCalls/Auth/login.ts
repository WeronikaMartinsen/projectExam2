import { apiRequest } from "../baseApiCallPost";
import { LoginRequest, LoginResponse } from "../Interfaces/loginResponse";
import { loginUrl } from "../Endpoints";

export async function loginUser(
  loginData: LoginRequest
): Promise<LoginResponse> {
  try {
    const response = await apiRequest<LoginRequest, LoginResponse>(
      loginUrl,
      "POST",
      loginData
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
