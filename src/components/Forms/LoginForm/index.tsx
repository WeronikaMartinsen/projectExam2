import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/ApiCalls/Auth/login";
import { LoginRequest } from "../../../service/ApiCalls/Interfaces/loginResponse";

//validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup.string().min(3).required("Password is required."),
  })
  .required();

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Handle form submission
  async function onSubmit(data: LoginRequest) {
    console.log("Form Data (GET):", data);
    try {
      // Call loginUser function with the form data
      const response = await loginUser(data);
      console.log("Login Response:", response);
      reset(); // Reset the form after submission (This "sets" the form to empty state)
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 className="mt-12 mb-6 text-3xl text-center">Login</h1>
      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">
            Email address*
          </label>
          <input
            {...register("email")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Email address"
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">
            Password*
          </label>
          <input
            {...register("password")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            placeholder="Password"
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
