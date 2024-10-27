import { createVenue } from "../../../service/apiRequests";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { useState } from "react";

interface VenueFormProps {
  token: string; // Pass the token for API authentication
}

// Validation schema
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
    rating: yup.number().min(0).max(5).optional(), // Make rating optional
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
      .optional(), // Make media optional
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
      .optional(), // Make location optional
  })
  .required();

const CreateVenueForm = ({ token }: VenueFormProps) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} />
        <p>{errors.description?.message}</p>
      </div>

      <div>
        <label>Price</label>
        <input type="number" {...register("price")} />
        <p>{errors.price?.message}</p>
      </div>

      <div>
        <label>Max Guests</label>
        <input type="number" {...register("maxGuests")} />
        <p>{errors.maxGuests?.message}</p>
      </div>

      <div>
        <label>Rating</label>
        <input type="number" {...register("rating")} min="0" max="5" />
        <p>{errors.rating?.message}</p>
      </div>

      {/* Media and location fields can be added here */}

      {loading ? (
        <button type="button" disabled>
          Loading...
        </button>
      ) : (
        <button type="submit">Create Venue</button>
      )}

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default CreateVenueForm;
