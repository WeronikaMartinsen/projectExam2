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
    .min(1, "Must be at least 1.")
    .max(5, "Cannot exceed 5 guests."),
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

  const { loading, errorMessage } = useVenueForm(
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

  const [successMessageState, setSuccessMessageState] = useState<string | null>(
    null
  );

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
          setValue("maxGuests", maxGuests ?? 1); // Ensure default is 1
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
    try {
      let id: string;

      if (venueId) {
        await updateVenue(venueId, data, token);
        id = venueId;
      } else {
        const response = await createVenue(data, token);
        id = response.data.id;
      }

      if (id) {
        setSuccessMessageState("Venue saved successfully!");
        setTimeout(() => {
          navigate(`/venue/${id}`);
        }, 2000);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h1 className="text-center text-3xl font-semibold">
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
            <input
              {...register(`media.${index}.alt`)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Image Alt Text"
            />
            <button
              type="button"
              className="text-danger mt-2"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-secondary text-white py-2 px-2 rounded-md"
          onClick={() => append({ url: "", alt: "" })}
        >
          Add Media
        </button>
      </div>

      {/* Location Fields */}
      <div className="mb-4">
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
          {...register("location.zip")}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="ZIP"
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

      <div className="mb-4">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.wifi")}
              className="mr-2"
            />
            WiFi
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.parking")}
              className="mr-2"
            />
            Parking
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("meta.breakfast")}
              className="mr-2"
            />
            Breakfast
          </label>
          <label className="flex items-center">
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
        className="w-full bg-primary text-white py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Saving..." : venueId ? "Update Venue" : "Create Venue"}
      </button>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}
      {successMessageState && (
        <p className="text-green-500 text-xs mt-2">{successMessageState}</p>
      )}
    </form>
  );
};

export default CreateVenueForm;
