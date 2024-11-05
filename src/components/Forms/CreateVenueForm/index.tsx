import { Resolver, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/useAuth";
import { createVenue } from "../../../service/apiRequests";
import { updateVenue } from "../../../service/apiRequests";
import { useVenueForm } from "../../Hooks/useVenueForm";
import { VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { useNavigate } from "react-router-dom";

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
  rating: yup.number().nullable().min(0).max(5), // Optional rating
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

interface CreateVenueFormProps {
  venueId?: string; // Optional for updating
}

const CreateVenueForm: React.FC<CreateVenueFormProps> = ({ venueId }) => {
  const { user, isLoggedIn } = useAuth();
  const token = user?.accessToken || "";
  const navigate = useNavigate();

  const { loading, successMessage, errorMessage, submit } = useVenueForm(
    createVenue,
    updateVenue,
    token,
    venueId // Pass venueId if updating
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  const onSubmit = async (data: VenueCreate) => {
    const venueData: VenueCreate = {
      ...data,
      media: data.media?.length ? data.media : undefined, // Use optional chaining
      rating: data.rating ?? null,
      location: data.location ?? null,
      meta: data.meta,
    };

    try {
      const id = await submit(venueData); // Use 'const' instead of 'let'

      if (id) {
        navigate(`/venue/${id}`);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
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
          className="mt-2 w-full bg-indigo-500 text-white py-2 rounded-md"
          onClick={() => append({ url: "", alt: "" })}
        >
          Add Media
        </button>
        <p className="text-red-500 text-xs italic">
          {errors.media?.[0]?.url?.message}
        </p>
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
        {/* Add more fields for zip, country, etc. */}
        <p className="text-red-500 text-xs italic">
          {errors.location?.address?.message}
        </p>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full bg-indigo-600 text-white py-2 rounded-md ${
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
