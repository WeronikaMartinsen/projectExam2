import { apiRequest, ApiResponse } from "../baseApiCallPost";
import { RegisterUserData } from "../Interfaces/userData";
import { registerUrl } from "../Endpoints";

// POST (Register User)
export const registerUser = async (
  registerData: RegisterUserData
): Promise<ApiResponse<RegisterUserData>> => {
  return apiRequest<RegisterUserData, RegisterUserData>(
    registerUrl,
    "POST",
    registerData
  );
};
