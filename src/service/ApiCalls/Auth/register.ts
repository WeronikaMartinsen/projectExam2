import { postRequest } from "../baseApiCallPost";
import { registerUrl } from "../Endpoints";
import { RegisterUserData } from "../Interfaces/userData";

export async function registerUser(userData: RegisterUserData): Promise<void> {
  try {
    const response = await postRequest<RegisterUserData>(registerUrl, userData);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
