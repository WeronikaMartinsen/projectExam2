import React, { useEffect, useState } from "react";
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
import apiErrorHandler from "../../../service/Utils/apiErrorhandler";
import SuccessMessage from "../../UserMessages/SuccessMessage";
import ErrorMessage from "../../UserMessages/ErrorMessage";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Venue name is required."),
  description: yup.string().required("Description is required."),
  price: yup
    .number()
    .required("Price is required.")
    .positive("Price must be positive.")
    .typeError("Price must be a valid number."),
  maxGuests: yup
    .number()
    .required("Maximum guests is required.")
    .min(1, "Must be at least 1.")
    .max(5, "Cannot exceed 5 guests.")
    .typeError("Maximum guests must be a valid number."),
  rating: yup
    .number()
    .nullable()
    .min(0, "Rating must be between 0 and 5.")
    .max(5, "Rating must be between 0 and 5.")
    .typeError("Rating must be a valid number."),
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup
          .string()
          .url("Must be a valid URL")
          .required("Must be a valid URL"),
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
      country: yup.string().nullable(),
      continent: yup.string().nullable(),
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

  const { loading } = useVenueForm(createVenue, updateVenue, token, venueId);

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
        country: "",
        continent: "",
      },
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "media",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (venueId) {
      const fetchVenueData = async () => {
        try {
          const response = await getVenueById(venueId);
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
          setValue("maxGuests", maxGuests ?? 1);
          setValue("rating", rating ?? 0);
          setValue("media", media || [{ url: "", alt: "" }]);
          setValue(
            "location",
            location || {
              address: "",
              city: "",
              country: "",
              continent: "",
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
          setErrorMessage("Failed to load venue data.");
        }
      };
      fetchVenueData();
    }
  }, [venueId, setValue]);

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
  if (!user?.venueManager) {
    return (
      <div>
        <MessageWithRedirect
          message="You must be a venue manager to create or update a venue."
          redirectTo={`/profiles/${user?.name}`}
          buttonText="Update your profile now"
          autoRedirect={false}
        />
      </div>
    );
  }
  const onSubmit = async (data: VenueCreate) => {
    try {
      let response;
      let redirectId;

      if (venueId) {
        response = await updateVenue(venueId, data, token);
        redirectId = venueId;
      } else {
        response = await createVenue(data, token);
        redirectId = response.data.id;
      }

      if (redirectId) {
        setSuccessMessage(
          venueId
            ? "Venue updated successfully!"
            : "Venue created successfully!"
        );

        setTimeout(() => {
          navigate(`/venue/${redirectId}`);
        }, 2000);
      }
    } catch (error) {
      const apiError = apiErrorHandler(error);
      setErrorMessage(apiError.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h1 className="text-center text-3xl">
        {venueId ? "Update" : "Create"} a venue
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Venue Name</label>
        <input
          {...register("name")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Venue Name"
        />
        <p className="text-danger text-xs">{errors.name?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Description"
        />
        <p className="text-danger text-xs">{errors.description?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          {...register("price")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Price"
          min="1"
          max="100000"
        />
        <p className="text-danger text-xs">{errors.price?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Maximum Guests</label>
        <input
          type="number"
          {...register("maxGuests", { valueAsNumber: true })}
          min={1}
          max={5}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Max Guests 5"
        />
        <p className="text-danger text-xs">{errors.maxGuests?.message}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Rating (0-5)</label>
        <input
          type="number"
          {...register("rating", { min: 0, max: 5 })}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Rating"
          min="0"
          max="5"
        />
        <p className="text-danger text-xs">{errors.rating?.message}</p>
      </div>

      {/* Media Fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Media</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col mb-2 space-y-2">
            <input
              {...register(`media.${index}.url`)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Image URL"
            />
            {/* Display specific error message for the URL field */}
            {errors.media?.[index]?.url && (
              <p className="text-danger text-xs">
                {errors.media[index].url.message}
              </p>
            )}
            <input
              {...register(`media.${index}.alt`)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Image Alt Text"
            />
          </div>
        ))}
      </div>

      {/* Location Fields */}
      <div className="mb-4 flex flex-col gap-2">
        <label className="block text-sm font-medium">Location</label>
        <input
          {...register("location.address")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Address"
        />
        <input
          {...register("location.city")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="City"
        />
        <input
          {...register("location.country")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Country"
        />
        <input
          {...register("location.continent")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Continent"
        />
      </div>

      <div className="mb-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WiFi */}
          <label className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <input
              type="checkbox"
              {...register("meta.wifi")}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-800 font-medium">WiFi</span>
          </label>

          {/* Parking */}
          <label className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <input
              type="checkbox"
              {...register("meta.parking")}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-800 font-medium">Parking</span>
          </label>

          {/* Breakfast */}
          <label className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <input
              type="checkbox"
              {...register("meta.breakfast")}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-800 font-medium">Breakfast</span>
          </label>

          {/* Pets Allowed */}
          <label className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <input
              type="checkbox"
              {...register("meta.pets")}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-800 font-medium">Pets Allowed</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : venueId ? "Update Venue" : "Create Venue"}
      </button>

      {/* Success or Error Messages */}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          duration={2000}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          duration={4000}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </form>
  );
};

export default CreateVenueForm;
