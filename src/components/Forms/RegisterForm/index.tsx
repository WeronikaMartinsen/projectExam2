import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .matches(/^[A-Za-z\s]+$/, "Full name should only contain letters.")
      .required("Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    subject: yup.string().min(3).required("Subject is required."),
    body: yup.string().min(3).required("Body is required."),
  })
  .required();

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

  function onSubmit(data: unknown) {
    console.log(data);
    reset();
    navigate("/");
  }
  return (
    <div className="w-full flex flex-col justify-center items-center sm:px-6 lg:px-8">
      <h1 className="mt-12 mb-6 text-3xl text-center">Register</h1>
      <form
        className="flex flex-wrap justify-center w-100 items-center m-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full name Field */}
        <div className="w-full flex flex-col mb-6">
          <label
            className="text-gray-700 text-md mb-2 text-left"
            htmlFor="fullName"
          >
            Full Name*
          </label>
          <input
            {...register("fullName")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter your name, e.g.: Maria Matinsen"
          />
          <p className="text-red-500 text-xs italic">
            {errors.fullName?.message}
          </p>
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

        {/* Subject Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">
            Subject*
          </label>
          <input
            {...register("subject")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            type="text"
            placeholder="Enter subject, e.g.: Shipment"
          />
          <p className="text-red-500 text-xs italic">
            {errors.subject?.message}
          </p>
        </div>

        {/* Body Field */}
        <div className="w-full flex flex-col mb-6">
          <label className="text-gray-700 text-md mb-2 text-left">Body*</label>
          <textarea
            {...register("body")}
            className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
            placeholder="Enter description..."
          />
          <p className="text-red-500 text-xs italic">{errors.body?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center mb-12 mt-4">
          <Link to="/">
            <ButtonPrimary
              type="button"
              className="text-white w-full bg-secondary"
            >
              Register
            </ButtonPrimary>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
