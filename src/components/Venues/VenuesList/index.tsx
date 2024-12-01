import React, { useState, useEffect } from "react";
import { useVenues } from "../../Hooks/useVenues";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
import Filtering from "../../Filtering";
import { useNavigate } from "react-router-dom";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

const VenuesList: React.FC = () => {
  const { venues, loading } = useVenues();
  const [filters, setFilters] = useState({
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
  });
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the initial list to show venues when the page loads
    setFilteredVenues(venues);
  }, [venues]);

  const handleVenueSelect = (id: string) => navigate(`/venue/${id}`);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setVisibleCount(15); // Reset visible count when filters change
  };

  const handleSearch = (searchResults: Venue[]) => {
    setFilteredVenues(searchResults); // Update the visible list to match the search results
    setVisibleCount(15); // Reset the visible count
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 15); // Increment the visible count by 15
  };

  const filteredAndSortedVenues = filteredVenues.filter(({ meta }) =>
    Object.entries(filters).every(([key, value]) =>
      value ? meta?.[key as keyof typeof filters] === true : true
    )
  );

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="lg:flex-1 flex flex-col items-center">
        <SearchVenues
          initialVenues={venues}
          onVenueSelect={handleVenueSelect}
          onSearch={handleSearch}
        />
        <div className="bg-gradient-to-r from-primary via-secondary to-accent flex w-full p-3 justify-center shadow">
          <Filtering filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="max-w-5xl w-full mt-4">
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
              {filteredAndSortedVenues.slice(0, visibleCount).map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </ul>
          )}

          {filteredAndSortedVenues.length > visibleCount && !loading && (
            <div className="flex justify-center mt-10">
              <button
                className="p-3 bg-secondary text-white rounded shadow hover:bg-accent-dark"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}

          {!loading && filteredAndSortedVenues.length === 0 && (
            <div className="text-center text-gray-500">
              No venues match your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuesList;
