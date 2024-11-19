import React, { useState } from "react";
import { useVenues } from "../../Hooks/useVenues";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
import LoadingSkeleton from "../../Skeleton";
import { useNavigate } from "react-router-dom";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

const VenuesList: React.FC = () => {
  const { venues, loading, error, hasMore, loadMore } = useVenues(15);
  const [searchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchResults = (filteredVenues: Venue[]) => {
    console.log("Filtered Venues:", filteredVenues);
  };
  const handleVenueSelect = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const filteredVenues = venues.filter(({ name, location }) =>
    [name, location?.city, location?.country]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center">
      <SearchVenues
        initialVenues={venues.slice(0, 15)}
        onVenueSelect={handleVenueSelect}
        onSearch={handleSearchResults}
      />
      <div className="max-w-5xl w-full mt-4">
        <ul className="space-y-8">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </ul>

        {loading && (
          <div className="mt-8">
            <LoadingSkeleton width="100%" height="150px" />
          </div>
        )}

        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              className="bg-secondary px-4 py-2 rounded hover:bg-accent-dark text-white"
              onClick={loadMore}
            >
              Show More
            </button>
          </div>
        )}

        {error && <div className="text-red-500">Error: {error}</div>}
      </div>
    </div>
  );
};

export default VenuesList;
