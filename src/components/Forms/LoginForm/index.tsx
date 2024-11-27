import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../../UserMessages/SuccessMessage";
import ErrorMessage from "../../ErrorMessage";

// Validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a valid stud.noroff.no address."
      )
      .required("Email is required."),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long.")
      .required("Password is required."),
  })
  .required();

function LoginForm() {
  const { login } = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (loginData: LoginRequest) => {
    try {
      const response: LoginResponse = await loginUser(loginData);
      const accessToken = response.accessToken;
      if (!accessToken) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      login(response);
      setShowMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Network Error")) {
          setErrorMessage("Network error, please try again later.");
        } else if (error.message.includes("401")) {
          setErrorMessage("Incorrect email or password. Please try again.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mt-4 mb-10">
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>

      {/* Success or Error Message */}
      {showMessage && (
        <SuccessMessage
          message="You are successfully logged in now!"
          duration={2000}
          onClose={() => setShowMessage(false)}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          duration={4000}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}

export default LoginForm;
