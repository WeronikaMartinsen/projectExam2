import React, { useEffect, useState } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { useNavigate } from "react-router-dom";
import VenueCard from "../VenueCard";
import SearchVenues from "../../Search/SearchVenues";
import LoadingSkeleton from "../../Skeleton";

const VenuesList: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesArray = await getVenues();
        setVenues(venuesArray);
        console.log(venuesArray);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed in useEffect";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueSelect = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const showMoreVenues = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 10);
  };

  const filteredVenues = venues.filter((venue) => {
    const name = venue.name?.toLowerCase() || "";
    const city = venue.location?.city?.toLowerCase() || "";
    const country = venue.location?.country?.toLowerCase() || "";

    return (
      name.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase()) ||
      country.includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="w-full flex flex-col align-middle items-center justify-center">
        {/* Skeleton for search bar */}
        <div className="mb-6">
          <LoadingSkeleton width="800px" height="50px" />
        </div>
        {/* Skeleton for venue cards */}
        <div className="max-w-7xl">
          <ul className="space-y-8 mt-4">
            {[...Array(visibleVenuesCount)].map((_, index) => (
              <li key={index}>
                <LoadingSkeleton width="100%" height="150px" />
              </li>
            ))}
          </ul>
        </div>
        {/* Skeleton for Show More button */}
        <div className="text-center mt-8">
          <LoadingSkeleton width="150px" height="40px" />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col align-middle items-center justify-center">
      {/* Pass all venues to the SearchVenues component */}
      <SearchVenues
        onSearch={handleSearch}
        venues={venues}
        onVenueSelect={handleVenueSelect}
      />
      <div className="max-w-7xl">
        <ul className="space-y-8 mt-4">
          {filteredVenues.slice(0, visibleVenuesCount).map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
            />
          ))}
        </ul>

        {visibleVenuesCount < filteredVenues.length && (
          <div className="text-center mt-8">
            <button
              className="bg-secondary p-3 rounded font-semibold text-sm mt-4 text-white transition-all duration-300 ease-in-out transform hover:bg-accent-dark hover:scale-102 hover:shadow-md"
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
