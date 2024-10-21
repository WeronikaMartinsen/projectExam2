import React, { useEffect, useState } from "react";
import { getVenues } from "../../../service/apiRequests"; // Adjust the import path as necessary
import { Venue } from "../../../service/ApiCalls/Interfaces/venue"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const VenuesList = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getVenues();
        console.log("Fetched Venues:", response); // Log fetched data
        if (Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          setVenues([]); // Handle unexpected response
        }
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(errorMessage);
        setLoading(false);
        console.error("Fetch Venues Error:", error); // Log the error object
      }
    };

    fetchVenues();
  }, []);

  const handleVenueClick = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const showMoreVenues = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 10);
  };

  if (loading) return <div>Loading venues...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <ul className="space-y-8">
        {venues.slice(0, visibleVenuesCount).map((venue) => (
          <li
            key={venue.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleVenueClick(venue.id)}
          >
            <div className="venue-image-container w-full h-48 md:h-64 overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover"
                src={venue.media[0]?.url}
                alt={venue.media[0]?.alt || venue.name}
              />
            </div>
            <div className="venue-details flex flex-col justify-center">
              <h2 className="text-xl font-semibold">{venue.name}</h2>
              <p className="text-gray-700 mt-2">{venue.description}</p>
            </div>
            <div className="venue-price flex items-center justify-center">
              <p className="text-lg font-bold text-blue-600">
                Price: ${venue.price}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {visibleVenuesCount < venues.length && (
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
