import { createVenue } from "../../../service/apiRequests";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Venue name is required."),
  description: yup.string().required("Description is required."),
  price: yup
    .number()
    .required("Price is required.")
    .positive("Price must be positive."),
  maxGuests: yup
    .number()
    .required("Maximum guests is required.")
    .positive("Must be at least 1."),
  rating: yup.number().min(0).max(5).optional(),
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup
          .string()
          .url("Must be a valid URL")
          .required("URL is required."),
        alt: yup.string().required("Alt text is required."),
      })
    )
    .optional(),
  location: yup
    .object()
    .shape({
      address: yup.string().optional(),
      city: yup.string().optional(),
      zip: yup.string().optional(),
      country: yup.string().optional(),
      continent: yup.string().optional(),
      lat: yup.number().optional(),
      lng: yup.number().optional(),
    })
    .optional(),
});

const CreateVenueForm = () => {
  const { user, isLoggedIn } = useAuth(); // Get user and login status from context
  const token = user?.accessToken;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VenueCreate>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (venueData: VenueCreate) => {
    if (!token) {
      console.error("No access token available");
      setErrorMessage("You need to be logged in to create a venue.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response: ApiResponse<VenueCreate> = await createVenue(
        venueData,
        token
      );
      console.log("Venue created successfully:", response);
      setSuccessMessage("Venue created successfully!");
    } catch (error) {
      console.error("Error creating venue:", error);
      setErrorMessage("Failed to create venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">You must be logged in to create a venue.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Venue Name"
        />
        <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Description"
        />
        <p className="text-red-500 text-xs italic">
          {errors.description?.message}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          {...register("price")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Price"
        />
        <p className="text-red-500 text-xs italic">{errors.price?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Guests
        </label>
        <input
          type="number"
          {...register("maxGuests")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Maximum Guests"
        />
        <p className="text-red-500 text-xs italic">
          {errors.maxGuests?.message}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <input
          type="number"
          {...register("rating")}
          min="0"
          max="5"
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Rating (0-5)"
        />
        <p className="text-red-500 text-xs italic">{errors.rating?.message}</p>
      </div>

      {/* Media Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Media</label>
        <textarea
          {...register("media")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder='{"url": "http://example.com/image.jpg", "alt": "Image description"}'
        />
        <p className="text-red-500 text-xs italic">{errors.media?.message}</p>
      </div>

      {/* Location Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <textarea
          {...register("location")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder='{"address": "123 Venue St", "city": "Venue City"}'
        />
        <p className="text-red-500 text-xs italic">
          {errors.location?.message}
        </p>
      </div>

      {loading ? (
        <button
          type="button"
          className="mt-4 w-full bg-gray-300 text-white py-2 rounded-md"
          disabled
        >
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Create Venue
        </button>
      )}

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default CreateVenueForm;
