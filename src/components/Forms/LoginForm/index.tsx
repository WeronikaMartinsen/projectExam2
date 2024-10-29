import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../../service/ApiCalls/Auth/login";
import {
  LoginRequest,
  LoginResponse,
} from "../../../service/ApiCalls/Interfaces/loginResponse";
import "../../../styles/index.css";
import { useAuth } from "../../../context/useAuth";

// Validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required."),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long.")
      .required("Password is required."),
  })
  .required();

interface LoginFormProps {
  handleOpen: () => void; // Close modal function
}

function LoginForm({ handleOpen }: LoginFormProps) {
  const { login } = useAuth(); // Use the login function from AuthContext
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (loginData: LoginRequest) => {
    try {
      const response: LoginResponse = await loginUser(loginData); // Call the login function
      console.log("API Response:", response);
      const accessToken = response.accessToken;

      if (!accessToken) {
        console.error("Login failed: No access token found in response.");
        return;
      }

      // Update the Auth context state
      login(response); // Pass the response to the login function

      localStorage.setItem("accessToken", accessToken);
      handleOpen();
      console.log("Login successful, token:", accessToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="mt-6 mb-6 text-3xl text-center">Login</h1>
      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left hidden">
            Email address*
          </label>
          <input
            {...register("email")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Email address*"
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left hidden">
            Password*
          </label>
          <input
            {...register("password")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            placeholder="Password*"
            type="password"
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mt-4">
          <button
            type="submit"
            className="w-full border bg-secondary text-white p-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
