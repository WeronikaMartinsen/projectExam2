import { useState } from "react";
import { deleteVenue } from "../../../service/apiRequests";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost"; // Import the correct ApiResponse type

interface UseDeleteVenueResult {
  loading: boolean;
  data: string | null; // Success message or null
  error: string | null; // Error message or null
  deleteVenue: (venueId: string) => Promise<void>;
}

export const useDeleteVenue = (token: string): UseDeleteVenueResult => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null); // For success messages
  const [error, setError] = useState<string | null>(null); // For error messages

  const deleteVenueHandler = async (venueId: string) => {
    setLoading(true);
    setError(null); // Clear previous errors
    setData(null); // Clear previous success messages

    if (!token) {
      setError("Token is missing or invalid.");
      setLoading(false);
      return;
    }

    try {
      const response: ApiResponse<null> = await deleteVenue(venueId, token);

      // Check if the response data is null to confirm success
      if (response.data === null) {
        setData("Venue deleted successfully."); // Set success message
      } else {
        setError("Failed to delete the venue."); // Handle failure
      }
    } catch (err) {
      setError("An error occurred while deleting the venue."); // Handle unexpected errors
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, deleteVenue: deleteVenueHandler };
};
