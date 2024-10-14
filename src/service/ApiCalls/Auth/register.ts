import { postRequest } from "../baseApiCallPost";
import { baseUrl, registerUrl } from "../Endpoints";
import { RegisterUserData } from "../Interfaces/userData";

export async function registerUser(
  userData: RegisterUserData
): Promise<Response> {
  try {
    const response = await postRequest<RegisterUserData>(
      baseUrl + registerUrl,
      userData
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
