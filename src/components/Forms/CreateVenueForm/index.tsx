import React, { useEffect } from "react";
import { Resolver, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/useAuth";
import {
  createVenue,
  getVenueById,
  updateVenue,
} from "../../../service/apiRequests";
import { useVenueForm } from "../../Hooks/useVenueForm";
import { VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { useNavigate, useParams } from "react-router-dom";
import MessageWithRedirect from "../../UserMessages/MessageWithRedirect";

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
  rating: yup.number().nullable().min(0).max(5),
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url("Must be a valid URL").optional(),
        alt: yup.string().optional(),
      })
    )
    .nullable()
    .default([]),
  location: yup
    .object()
    .shape({
      address: yup.string().nullable(),
      city: yup.string().nullable(),
      zip: yup.string().nullable(),
      country: yup.string().nullable(),
      continent: yup.string().nullable(),
      lat: yup.number().nullable().default(0),
      lng: yup.number().nullable().default(0),
    })
    .nullable()
    .default(null),
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

const CreateVenueForm: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const token = user?.accessToken || "";
  const navigate = useNavigate();
  const { venueId } = useParams();

  console.log("venueId from useParams:", venueId);

  const { loading, successMessage, errorMessage } = useVenueForm(
    createVenue,
    updateVenue,
    token,
    venueId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<VenueCreate>({
    resolver: yupResolver(schema) as Resolver<VenueCreate>,
    defaultValues: {
      media: [{ url: "", alt: "" }],
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  useEffect(() => {
    console.log("venueId from useParams:", venueId);
    if (venueId) {
      // Fetch venue data if venueId exists
      const fetchVenueData = async () => {
        try {
          console.log("venueId from useParams:", venueId);
          const response = await getVenueById(venueId);
          console.log("Fetched venue data:", response);

          const {
            name,
            description,
            price,
            maxGuests,
            rating,
            media,
            location,
            meta,
          } = response.data;

          setValue("name", name);
          setValue("description", description);
          setValue("price", price);
          setValue("maxGuests", maxGuests);
          setValue("rating", rating ?? 0);
          setValue("media", media || [{ url: "", alt: "" }]);
          setValue(
            "location",
            location || {
              address: "",
              city: "",
              zip: "",
              country: "",
              continent: "",
              lat: 0,
              lng: 0,
            }
          );
          setValue(
            "meta",
            meta || {
              wifi: false,
              parking: false,
              breakfast: false,
              pets: false,
            }
          );
        } catch (error) {
          console.error("Error fetching venue data:", error);
        }
      };
      fetchVenueData();
    }
  }, [venueId, setValue]);

  const onSubmit = async (data: VenueCreate) => {
    console.log("Form submitted with data:", data);

    try {
      let id: string;

      if (venueId) {
        // Update existing venue
        await updateVenue(venueId, data, token); // No need to capture `id` here, it's already in `venueId`
        id = venueId; // Use venueId directly for redirection
      } else {
        // Create a new venue
        const response = await createVenue(data, token);
        id = response.data.id;
      }

      if (id) {
        // Navigate to the venue detail page using the correct venue ID
        console.log("Redirecting to venue with ID:", id);
        navigate(`/venue/${id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <MessageWithRedirect
          message="You must be logged in to create or update a venue."
          redirectTo="/login"
          buttonText="Go to Login"
          autoRedirect={false}
        />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full p-3">
      <h1 className="text-center text-2xl m-4">
        {venueId ? "Update" : "Create"} a venue
      </h1>

      <div className="mb-4">
        <label className="invisible">Name</label>
        <input
          {...register("name")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Venue Name"
        />
        <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
        <label className="invisible">Price</label>
        <input
          type="number"
          {...register("price")}
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Price"
        />
        <p className="text-red-500 text-xs italic">{errors.price?.message}</p>
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
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

      {/* Media Fields */}
      <div className="mb-4">
        <label className="invisible">Media</label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-2">
            <input
              {...register(`media.${index}.url`)}
              className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Media URL"
            />
            <input
              {...register(`media.${index}.alt`)}
              className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Media Alt Text"
            />
            <button
              type="button"
              className="mt-2 text-red-500"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-secondary p-3 rounded font-semibold text-sm mt-4 text-white transition-all duration-300 ease-in-out transform hover:bg-accent-dark hover:scale-102 hover:shadow-md"
          onClick={() => append({ url: "", alt: "" })}
        >
          Add Image
        </button>
      </div>

      {/* Location Fields */}
      <div className="mb-4">
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
        <p className="text-red-500 text-xs italic">
          {errors.location?.address?.message}
        </p>
      </div>

      {/* Meta Fields */}
      <div>
        <label className="invisible">Meta</label>
        <div className="flex justify-between align-middle mb-4">
          <label>
            <input
              type="checkbox"
              {...register("meta.wifi")}
              className="mr-2"
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              {...register("meta.parking")}
              className="mr-2"
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              {...register("meta.breakfast")}
              className="mr-2"
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              {...register("meta.pets")}
              className="mr-2"
            />
            Pets Allowed
          </label>
        </div>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full bg-primary text-white py-2 rounded-md ${
          loading ? "bg-gray-300" : "hover:bg-indigo-700"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : venueId ? "Update Venue" : "Create Venue"}
      </button>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default CreateVenueForm;
