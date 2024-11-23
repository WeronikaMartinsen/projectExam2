import { useState } from "react";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { Venue, VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";
import apiErrorHandler from "../../../service/Utils/apiErrorhandler";

export const useVenueForm = (
  createVenue: (
    venue: VenueCreate,
    token: string
  ) => Promise<ApiResponse<Venue>>,
  updateVenue: (
    id: string,
    venue: Venue,
    token: string
  ) => Promise<ApiResponse<Venue>>,
  token: string,
  venueId?: string
) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (venueData: VenueCreate) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      let response: ApiResponse<Venue>;

      if (venueId) {
        response = await updateVenue(venueId, venueData as Venue, token);
        setSuccessMessage("Venue updated successfully!");
      } else {
        response = await createVenue(venueData, token);
        setSuccessMessage("Venue created successfully!");
      }
      return response.data.id;
    } catch (error) {
      const handledError = apiErrorHandler(error);
      setErrorMessage(handledError.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, errorMessage, submit };
};
