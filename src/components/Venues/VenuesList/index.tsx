import React, { useState } from "react";
import { useVenues } from "../../Hooks/useVenues";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
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
      {/* Search Component */}
      <SearchVenues
        initialVenues={venues.slice(0, 15)}
        onVenueSelect={handleVenueSelect}
        onSearch={handleSearchResults}
      />

      <div className="max-w-5xl w-full mt-4">
        {/* Skeleton or Venue List */}
        {loading && !venues.length ? (
          <ul className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <li
                key={index}
                className="rounded-lg shadow-sm bg-gray-200 animate-pulse p-4"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-md bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-8">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </ul>
        )}

        {/* Show More Button Skeleton */}
        {loading && venues.length > 0 && (
          <div className="mt-8">
            <div className="h-10 w-40 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        )}

        {/* Show More Button */}
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

        {/* Error Message */}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>
    </div>
  );
};

export default VenuesList;
