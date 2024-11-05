import { useState } from "react";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { Venue, VenueCreate } from "../../../service/ApiCalls/Interfaces/venue";

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
  venueId?: string // Optional venueId for update
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
        // If venueId is provided, we're updating the venue
        response = await updateVenue(venueId, venueData as Venue, token);
        setSuccessMessage("Venue updated successfully!");
      } else {
        // If venueId is not provided, we're creating a new venue
        response = await createVenue(venueData, token);
        setSuccessMessage("Venue created successfully!");
      }

      // Return the venue ID (whether it's created or updated)
      return response.data.id;
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to save venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, errorMessage, submit };
};
