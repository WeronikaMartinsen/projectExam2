import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../../service/ApiCalls/Auth/register";
import { RegisterUserData } from "../../../service/ApiCalls/Interfaces/userData";
import "../../../styles/index.css";
import { setUser } from "../../../service/Utils/userUtils";

// Validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Your name should be at least 3 characters.")
      .matches(
        /^[A-Za-z_\s]+$/,
        "Name must only contain letters, spaces, or underscores (_)."
      )
      .required("Name is required."),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Email must be a valid stud.noroff.no address."
      )
      .required("Email is required."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required."),
    bio: yup
      .string()
      .max(160, "Bio must be less than 160 characters.")
      .nullable(),
    role: yup
      .string()
      .oneOf(["customer", "venue_manager"], "Please select a role.")
      .required(),
    avatar: yup.object().shape({
      url: yup.string().url("Please enter a valid URL.").nullable(),
      alt: yup
        .string()
        .max(120, "Alt text must be less than 120 characters.")
        .nullable(),
    }),
    banner: yup.object().shape({
      url: yup.string().url("Please enter a valid URL.").nullable(),
      alt: yup
        .string()
        .max(120, "Alt text must be less than 120 characters.")
        .nullable(),
    }),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface RegisterFormProps {
  switchToLogin: () => void;
}

function RegisterForm({ switchToLogin }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    const data: RegisterUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio || undefined,
      avatar: formData.avatar?.url
        ? {
            url: formData.avatar.url,
            alt: formData.avatar.alt || "User avatar",
          }
        : undefined,
      banner: formData.banner?.url
        ? {
            url: formData.banner.url,
            alt: formData.banner.alt || "User banner",
          }
        : undefined,
      venueManager: formData.role === "venue_manager",
    };

    try {
      const response = await registerUser(data);
      if (response.data) {
        console.log("User registered successfully", response.data);
        setUser(response.data);
        reset();
        switchToLogin();
      } else {
        console.error("Failed to register user:", response.message);
        alert("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:px-6 lg:px-8">
      <h1 className="mt-4 mb-6 text-3xl text-center">Register</h1>

      {/* Role Selection */}
      <div className="mb-4 flex justify-center">
        <label className="flex items-center mr-4">
          <input
            type="radio"
            value="customer"
            {...register("role")}
            className="mr-2"
          />
          <span className="text-gray-700">Customer</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="venue_manager"
            {...register("role")}
            className="mr-2"
          />
          <span className="text-gray-700">Venue Manager</span>
        </label>
      </div>
      {errors.role && (
        <p className="text-red-500 text-xs italic">{errors.role.message}</p>
      )}

      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full Name and Email Fields in one row */}
        <div className="w-full flex flex-row mb-4 justify-between space-x-2">
          <div className="flex flex-col w-1/2">
            <input
              {...register("name")}
              className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
              type="text"
              placeholder="Name*"
            />
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>

          <div className="flex flex-col w-1/2">
            <input
              {...register("email")}
              className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
              type="text"
              placeholder="Email address*"
            />
            <p className="text-red-500 text-xs italic">
              {errors.email?.message}
            </p>
          </div>
        </div>

        {/* Password Field */}
        <div className="w-full flex flex-col mb-4">
          <input
            {...register("password")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="password"
            placeholder="Password*"
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>

        {/* Avatar URL Field */}
        <div className="w-full flex flex-col mb-4">
          <input
            {...register("avatar.url")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="url"
            placeholder="Avatar URL"
          />
          <p className="text-red-500 text-xs italic">
            {errors.avatar?.url?.message}
          </p>
        </div>

        {/* Banner URL Field */}
        <div className="w-full flex flex-col mb-4">
          <input
            {...register("banner.url")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="url"
            placeholder="Banner URL"
          />
          <p className="text-red-500 text-xs italic">
            {errors.banner?.url?.message}
          </p>
        </div>

        {/* Bio Field */}
        <div className="w-full flex flex-col mb-4">
          <textarea
            {...register("bio")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            placeholder="Tell us about yourself..."
          />
          <p className="text-red-500 text-xs italic">{errors.bio?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mt-2">
          <button
            type="submit"
            className="w-full border bg-secondary text-white p-2 rounded hover:bg-accent transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
