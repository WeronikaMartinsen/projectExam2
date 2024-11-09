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
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed in useEffect";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Filtering venues based on search query
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

  const handleVenueSelect = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const showMoreVenues = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 10);
  };

  if (loading) return <LoadingSkeleton width="800px" height={40} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col align-middle items-center justify-center">
      <SearchVenues
        onSearch={handleSearch}
        filteredVenues={filteredVenues}
        onVenueSelect={handleVenueSelect}
      />
      <div className="max-w-7xl">
        <ul className="space-y-8 mt-4">
          {filteredVenues.slice(0, visibleVenuesCount).map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onClick={() => handleVenueSelect(venue.id)}
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
