import React, { useEffect, useState, useContext } from "react";
import { getVenues } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; // Correct AuthContext import

const VenuesList = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleVenuesCount, setVisibleVenuesCount] = useState(10); // Limit initially to 10 venues

  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      if (!user?.accessToken) {
        setError("No access token found");
        return;
      }

      try {
        const response = await getVenues(user.accessToken); // Pass the accessToken to the API call
        setVenues(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching venue details");
        setLoading(false);
        console.error("Fetch Venues Error:", error);
      }
    };

    fetchVenues();
  }, [user?.accessToken]);

  const handleVenueClick = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const showMoreVenues = () => {
    setVisibleVenuesCount((prevCount) => prevCount + 10); // Increment by 10 each time
  };

  if (loading) return <div>Loading venues...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <ul className="space-y-8">
        {venues.slice(0, visibleVenuesCount).map(
          (
            venue // Limit displayed venues
          ) => (
            <li
              key={venue.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              onClick={() => handleVenueClick(venue.id)}
            >
              {/* Image Section */}
              <div className="venue-image-container w-full h-48 md:h-64 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={venue.media[0]?.url}
                  alt={venue.media[0]?.alt || venue.name}
                />
              </div>
              {/* Description Section */}
              <div className="venue-details flex flex-col justify-center">
                <h2 className="text-xl font-semibold">{venue.name}</h2>
                <p className="text-gray-700 mt-2">{venue.description}</p>
              </div>
              {/* Price Section */}
              <div className="venue-price flex items-center justify-center">
                <p className="text-lg font-bold text-blue-600">
                  Price: ${venue.price}
                </p>
              </div>
            </li>
          )
        )}
      </ul>

      {/* Show More Button */}
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
