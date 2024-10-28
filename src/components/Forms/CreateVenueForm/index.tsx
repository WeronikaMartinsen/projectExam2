import { createVenue } from "../../../service/apiRequests";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
const schema = yup
  .object({
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
    rating: yup.number().nullable().min(0).max(5), // Optional rating
    media: yup
      .array()
      .of(
        yup.object().shape({
          url: yup
            .string()
            .url("Must be a valid URL")
            .required("URL is required."),
          alt: yup.string().optional(),
        })
      )
      .nullable(), // This means it can be null or not provided
    location: yup
      .object()
      .shape({
        address: yup.string().nullable(),
        city: yup.string().nullable(),
        zip: yup.string().nullable(),
        country: yup.string().nullable(),
        continent: yup.string().nullable(),
        lat: yup.number().nullable(),
        lng: yup.number().nullable(),
      })
      .nullable(), // This means it can also be null
  })
  .required();

const CreateVenueForm = () => {
  const { user, isLoggedIn } = useAuth();
  const token = user?.accessToken || ""; // Ensure token is defined
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VenueCreate>({
    resolver: yupResolver(schema) as Resolver<VenueCreate>,
  });

  const onSubmit = async (data: VenueCreate) => {
    const venueData: VenueCreate = {
      name: data.name,
      description: data.description,
      price: data.price,
      maxGuests: data.maxGuests,
      rating: data.rating ?? undefined, // Optional
      media: data.media ?? undefined, // Optional
      location: data.location ?? undefined, // Optional
      meta: data.meta, // If you have meta in your form, handle it here
    };

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
          Maximum Guests
        </label>
        <input
          type="number"
          {...register("maxGuests")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Max Guests"
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
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Rating (0-5)"
          min="0"
          max="5"
        />
        <p className="text-red-500 text-xs italic">{errors.rating?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Media</label>
        <textarea
          {...register("media")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Url"
        />
        <p className="text-red-500 text-xs italic">{errors.media?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          {...register("location")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder=""
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
