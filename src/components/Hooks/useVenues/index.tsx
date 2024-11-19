import { useState, useEffect, useCallback } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

export const useVenues = (initialLimit = 15) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchVenues = useCallback(async () => {
    if (!hasMore) return; // Prevent fetching when there's no more data

    setLoading(true);
    setError(null);

    try {
      const newVenues = await getVenues(page, initialLimit);
      if (newVenues.length < initialLimit) {
        setHasMore(false); // No more pages to fetch
      }

      // Ensure no duplicates are added
      setVenues((prevVenues) => {
        const existingIds = new Set(prevVenues.map((venue) => venue.id));
        const uniqueVenues = newVenues.filter(
          (venue) => !existingIds.has(venue.id)
        );
        return [...prevVenues, ...uniqueVenues];
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error fetching venues"
      );
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit, hasMore]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const loadMore = useCallback(() => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  }, [hasMore]);

  return { venues, loading, error, hasMore, loadMore };
};
