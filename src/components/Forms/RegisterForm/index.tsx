import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../service/ApiCalls/Auth/register";
import { RegisterUserData } from "../../../service/ApiCalls/Interfaces/userData";

//validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .matches(/^[A-Za-z\s]+$/, "Full name should only contain letters.")
      .required("Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup.string().min(3).required("Password is required."),
    avatar: yup
      .string() // Ensure it's a string
      .url("Please enter a valid URL.") // Validate it's a proper URL
      .min(3, "The URL must be at least 3 characters long.") // Minimum length of 3
      .required("URL is required."), // URL is required

    bio: yup.string().min(3).required("Body is required."),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    const data: RegisterUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      avatar: {
        url: formData.avatar,
        alt: "User avatar",
      },
    };

    try {
      const response = await registerUser(data);
      if (response.status === 200) {
        const responseData = await response.json();
        console.log("User registered successfully", responseData);
        reset();
        navigate("/");
      } else {
        console.error("Failed to register user:", response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:px-6 lg:px-8">
      <h1 className="mt-4 mb-4 text-3xl text-center">Register</h1>
      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full name Field */}
        <div className="w-full flex flex-col mb-6">
          <label
            className="text-gray-700 text-md mb-2 text-left"
            htmlFor="name"
          >
            Full Name*
          </label>
          <input
            {...register("name")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter your name, e.g.: Maria Matinsen"
          />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>

        {/* Email Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">
            Email address*
          </label>
          <input
            {...register("email")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter your email, e.g.: email@gmail.com"
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

        {/* Avatar Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">Avatar</label>
          <input
            {...register("avatar")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="url"
            placeholder="Image url"
          />
          <p className="text-red-500 text-xs italic">
            {errors.avatar?.message}
          </p>
        </div>

        {/* Bio Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">Bio</label>
          <input
            {...register("bio")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            placeholder="Description yourselv..."
          />
          <p className="text-red-500 text-xs italic">{errors.bio?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mt-2">
          <button type="button" className="w-full bg-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
