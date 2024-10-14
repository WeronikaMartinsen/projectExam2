import { postRequest } from "../baseApiCallPost";
import { LoginRequest, LoginResponse } from "../Interfaces/loginResponse";
import { baseUrl, loginUrl } from "../Endpoints";

export async function loginUser(
  loginData: LoginRequest
): Promise<LoginResponse> {
  try {
    const response = await postRequest<LoginRequest>(
      baseUrl + loginUrl,
      loginData
    );
    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
