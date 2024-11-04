import { useState } from "react";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { Venue, VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";

export const useVenueForm = (
  createVenue: (
    venue: VenueCreate,
    token: string
  ) => Promise<ApiResponse<Venue>>,
  token: string
) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (venueData: VenueCreate) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response: ApiResponse<Venue> = await createVenue(venueData, token);
      setSuccessMessage("Venue created successfully!");
      return response.data.id;
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to create venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, errorMessage, submit };
};
