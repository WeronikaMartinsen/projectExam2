import { useState, useEffect, useCallback } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

/**
 * Custom hook to fetch and manage venues data.
 *
 * This hook is responsible for fetching a list of venues from an API,
 * managing the loading state, handling errors, and storing the venues
 * in a state variable. It ensures that the data is fetched once on
 * component mount and updates the state accordingly.
 *
 * @returns {Object} An object containing:
 * - `venues`: The list of venues fetched from the API.
 * - `loading`: A boolean indicating if the data is still being fetched.
 * - `error`: A string representing any error encountered during the fetch, or `null` if no error.
 */

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allVenues = await getVenues();
      setVenues(allVenues);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching venues"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error };
};
