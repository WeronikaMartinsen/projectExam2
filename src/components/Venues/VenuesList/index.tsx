import React, { useState } from "react";
import { useVenues } from "../../Hooks/useVenues";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
import Filtering from "../../Filtering";
import { useNavigate } from "react-router-dom";

const VenuesList: React.FC = () => {
  const { venues, loading, error, hasMore, loadMore } = useVenues(15);
  const [filters, setFilters] = useState({
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleVenueSelect = (id: string) => navigate(`/venue/${id}`);

  const filteredVenues = venues.filter(({ name, location, meta }) => {
    const matchesSearch = [name, location?.city, location?.country]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return meta?.[key as keyof typeof filters] === true;
    });

    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="lg:flex-1 flex flex-col items-center">
        {/* Search Bar */}
        <SearchVenues
          initialVenues={venues.slice(0, 15)}
          onVenueSelect={handleVenueSelect}
          onSearch={(filteredVenues) => {
            handleSearch(filteredVenues[0]?.name || "");
          }}
        />
        {/* Filtering for Filters */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent flex w-full p-3 justify-center shadow">
          <Filtering filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Venue List */}
        <div className="max-w-5xl w-full mt-4">
          {/* Loading Skeleton */}
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

          {/* Load More Button */}
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
          {error && <div className="text-danger">Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default VenuesList;
