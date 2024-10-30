import { createVenue } from "../../../service/apiRequests";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Venue, VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

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
  rating: yup.number().nullable().min(0).max(5), // Optional rating
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url("Must be a valid URL").optional(),
        alt: yup.string().optional(),
      })
    )
    .nullable() // Allow media to be null
    .default([]),
  location: yup
    .object()
    .shape({
      address: yup.string().nullable(),
      city: yup.string().nullable(),
      zip: yup.string().nullable(),
      country: yup.string().nullable(),
      continent: yup.string().nullable(),
      lat: yup.number().nullable().default(0), // Optional, default 0
      lng: yup.number().nullable().default(0), // Optional, default 0
    })
    .nullable() // Allow location to be nullable
    .default(null), // Default to null
  meta: yup
    .object()
    .shape({
      wifi: yup.boolean().default(false),
      parking: yup.boolean().default(false),
      breakfast: yup.boolean().default(false),
      pets: yup.boolean().default(false),
    })
    .default({}), 
});

const CreateVenueForm = () => {
  const { user, isLoggedIn } = useAuth();
  const token = user?.accessToken || ""; 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

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
      rating: data.rating ?? null, 
      media:
        Array.isArray(data.media) && data.media.length > 0
          ? data.media
          : undefined,
      location: data.location ?? null, 
      meta: data.meta,
    };

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response: ApiResponse<Venue> = await createVenue(venueData, token);

      console.log("Venue created successfully:", response);
      const id = response.data.id; 
      setSuccessMessage("Venue created successfully!");
      navigate(`/venue/${id}`); 

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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full">
      <h1 className="text-center text-2xl m-4">Create a venue</h1>
      <div className="mb-">
        <label className="invisible">Name</label>
        <input
          {...register("name")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Venue Name"
        />
        <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
      </div>

      <div>
        <label className="invisible">Description</label>
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
        <label className="invisible">Price</label>
        <input
          type="number"
          {...register("price")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Price"
        />
        <p className="text-red-500 text-xs italic">{errors.price?.message}</p>
      </div>

      <div>
        <label className="invisible">Maximum Guests</label>
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
        <label className="invisible">Rating</label>
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
        <label className="invisible">Media</label>
        <input
          {...register("media.0.url")} // Adjusted for array syntax
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Media URL"
        />
        <p className="text-red-500 text-xs italic">
          {errors.media?.[0]?.url?.message}
        </p>
      </div>

      <div>
        <label className="invisible">Media Alt Text</label>
        <input
          {...register("media.0.alt")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Media Alt Text"
        />
        <p className="text-red-500 text-xs italic">
          {errors.media?.[0]?.alt?.message}
        </p>
      </div>
      <div>
        <label className="invisible">Location</label>
        <input
          {...register("location.address")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Address"
        />
        <input
          {...register("location.city")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="City"
        />
        {/* Add more fields for zip, country, etc. */}
        <p className="text-red-500 text-xs italic">
          {errors.location?.address?.message}
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
