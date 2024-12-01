import { useState, useEffect, useCallback } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

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
