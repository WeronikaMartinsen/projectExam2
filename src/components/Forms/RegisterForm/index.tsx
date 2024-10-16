import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
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

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema), // Yup schema resolver for form validation
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    // Prepare the form data to match the RegisterUserData structure
    const data: RegisterUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio || undefined, // Handle optional fields correctly
      avatar: formData.avatar?.url
        ? {
            url: formData.avatar.url,
            alt: formData.avatar.alt || "User avatar", // Fallback to default alt if not provided
          }
        : undefined,
      banner: formData.banner?.url
        ? {
            url: formData.banner.url,
            alt: formData.banner.alt || "User banner",
          }
        : undefined,
    };

    try {
      const response = await registerUser(data);

      if (response.data) {
        console.log("User registered successfully", response.data);
        setUser(response.data);
        reset();
        navigate("/");
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
      <h1 className="mt-4 mb-4 text-3xl text-center">Register</h1>
      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full Name Field */}
        <div className="w-full flex flex-col mb-4">
          <label
            className="text-gray-700 text-md mb-2 text-left"
            htmlFor="name"
          >
            Name*
          </label>
          <input
            {...register("name")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter your name"
          />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>

        {/* Email Field */}
        <div className="w-full flex flex-col mb-4">
          <label className="text-gray-700 text-md mb-2 text-left">
            Email address*
          </label>
          <input
            {...register("email")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div className="w-full flex flex-col mb-4">
          <label className="text-gray-700 text-md mb-2 text-left">
            Password*
          </label>
          <input
            {...register("password")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="password"
            placeholder="Password"
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>

        {/* Avatar URL Field */}
        <div className="w-full flex flex-col mb-4">
          <label className="text-gray-700 text-md mb-2 text-left">
            Avatar URL
          </label>
          <input
            {...register("avatar.url")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="url"
            placeholder="Image URL"
          />
          <p className="text-red-500 text-xs italic">
            {errors.avatar?.url?.message}
          </p>
        </div>

        {/* Banner URL Field */}
        <div className="w-full flex flex-col mb-4">
          <label className="text-gray-700 text-md mb-2 text-left">
            Banner URL
          </label>
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
          <label className="text-gray-700 text-md mb-2 text-left">Bio</label>
          <input
            {...register("bio")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Tell us about yourself..."
          />
          <p className="text-red-500 text-xs italic">{errors.bio?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mt-2">
          <button
            type="submit"
            className="w-full border bg-secondary text-white p-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
