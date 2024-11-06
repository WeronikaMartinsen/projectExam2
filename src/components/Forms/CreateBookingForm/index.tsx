import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingForm } from "../../Hooks/useBookingForm";
import { createBooking } from "../../../service/apiRequests";

// Validation schema for booking form
const schema = yup.object({
  dateFrom: yup.string().required("Start date is required."),
  dateTo: yup
    .string()
    .required("End date is required.")
    .min(yup.ref("dateFrom"), "End date cannot be before start date."),
  guests: yup
    .number()
    .required("Number of guests is required.")
    .positive("Guests must be at least 1.")
    .integer("Guests must be a whole number."),
  venueId: yup.string().required("Venue ID is required."),
});

interface BookingCreate {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

const CreateBookingForm: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const token = user?.accessToken || "";
  const navigate = useNavigate();
  const { id: venueId } = useParams<{ id: string }>();

  const { loading, successMessage, errorMessage, submitBooking } = useBookingForm(
    createBooking,
    token
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingCreate>({
    resolver: yupResolver(schema) as Resolver<BookingCreate>,
    defaultValues: { venueId }, // Set venueId from the route parameters
  });

  const onSubmit = async (data: BookingCreate) => {
    try {
      const bookingId = await submitBooking(data);
      if (bookingId) {
        navigate(`/booking/${bookingId}`);
      }
    } catch (error) {
      console.error("Error submitting booking form:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">You must be logged in to create a booking.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full">
      <h1 className="text-center text-2xl m-4">Create a Booking</h1>

      <div className="mb-4">
        <label className="invisible">Start Date</label>
        <input
          type="date"
          {...register("dateFrom")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <p className="text-red-500 text-xs italic">{errors.dateFrom?.message}</p>
      </div>

      <div className="mb-4">
        <label className="invisible">End Date</label>
        <input
          type="date"
          {...register("dateTo")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <p className="text-red-500 text-xs italic">{errors.dateTo?.message}</p>
      </div>

      <div className="mb-4">
        <label className="invisible">Guests</label>
        <input
          type="number"
          {...register("guests")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Number of Guests"
        />
        <p className="text-red-500 text-xs italic">{errors.guests?.message}</p>
      </div>

      <div className="mb-4">
        <label className="invisible">Venue ID</label>
        <input
          {...register("venueId")}
          className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none"
          readOnly
        />
        <p className="text-red-500 text-xs italic">{errors.venueId?.message}</p>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full bg-indigo-600 text-white py-2 rounded-md ${
          loading ? "bg-gray-300" : "hover:bg-indigo-700"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Booking"}
      </button>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default CreateBookingForm;
