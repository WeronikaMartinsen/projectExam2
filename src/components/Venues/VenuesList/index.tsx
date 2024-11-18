import React, { useState, useCallback } from "react";
import { useVenues } from "../../Hooks/useVenues";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
import LoadingSkeleton from "../../Skeleton";
import { useNavigate } from "react-router-dom";

const VenuesList: React.FC = () => {
  const { venues, loading, error } = useVenues();
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(10);
  const [searchQuery] = useState("");
  const navigate = useNavigate();

  const handleVenueSelect = useCallback(
    (id: string) => {
      navigate(`/venue/${id}`);
    },
    [navigate]
  );

  const showMoreVenues = useCallback(() => {
    setVisibleVenuesCount((prevCount) => prevCount + 10);
  }, []);

  const filteredVenues = venues.filter(({ name, location }) =>
    [name, location?.city, location?.country]
      .join(" ")
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="max-w-5xl w-full mt-4">
          {/* Simulated Skeleton Loader */}
          {[...Array(visibleVenuesCount)].map((_, index) => (
            <LoadingSkeleton key={index} width="100%" height="150px" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* SearchVenues Component */}
      <SearchVenues
        initialVenues={venues.slice(0, 10)}
        onVenueSelect={handleVenueSelect}
        onSearch={() => setVisibleVenuesCount(10)} // No unused parameter
      />

      <div className="max-w-5xl w-full mt-4">
        <ul className="space-y-8">
          {filteredVenues.slice(0, visibleVenuesCount).map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </ul>
        {visibleVenuesCount < filteredVenues.length && (
          <div className="text-center mt-8">
            <button
              className="bg-secondary px-4 py-2 rounded hover:bg-accent-dark text-white"
              onClick={showMoreVenues}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuesList;
