import { useState } from "react";
import { deleteVenue } from "../../../service/apiRequests";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost"; // Import the correct ApiResponse type

interface UseDeleteVenueResult {
  loading: boolean;
  data: null | string; // Success message or null
  error: string | null; // Error message or null
  deleteVenue: (venueId: string) => Promise<void>;
}

export const useDeleteVenue = (token: string): UseDeleteVenueResult => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | string>(null); // For success messages
  const [error, setError] = useState<string | null>(null); // For error messages

  const deleteVenueHandler = async (venueId: string) => {
    setLoading(true);
    setData(null);
    setError(null);
  
    if (!token) {
      setError("Token is missing or invalid.");
      setLoading(false);
      return;
    }

    try {
      const response: ApiResponse<null> = await deleteVenue(venueId, token);

      if (response.data === null) {
        setData("Venue deleted successfully.");
      } else {
        setError("Failed to delete the venue.");
      }
    } catch (err) {
      setError("An error occurred while deleting the venue.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, deleteVenue: deleteVenueHandler };
};
