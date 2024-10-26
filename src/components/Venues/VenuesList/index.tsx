import React, { useEffect, useState } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { useNavigate } from "react-router-dom";
import VenueCard from "../VenueCard";
import Sidebar from "../../../layout/Sidebar";

interface Filters {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
}

const VenuesList = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(10);

  const [filters, setFilters] = useState<Filters>({
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesArray = await getVenues();
        console.log("Fetched Venues:", venuesArray);
        setVenues(venuesArray);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Fails in useEffect";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredVenues = venues.filter((venue) => {
    const { wifi, breakfast, parking, pets } = filters;
    return (
      (!wifi || venue.meta.wifi) &&
      (!breakfast || venue.meta.breakfast) &&
      (!parking || venue.meta.parking) &&
      (!pets || venue.meta.pets)
    );
  });

  const handleVenueClick = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const showMoreVenues = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 10);
  };

  if (loading) return <div>Loading venues...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 mt-6">
      {/* Sidebar moved to the top */}
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />

      <ul className="space-y-8 mt-4">
        {filteredVenues.slice(0, visibleVenuesCount).map((venue) => (
          <VenueCard key={venue.id} venue={venue} onClick={handleVenueClick} />
        ))}
      </ul>

      {visibleVenuesCount < filteredVenues.length && (
        <div className="text-center mt-8">
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded"
            onClick={showMoreVenues}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default VenuesList;
