import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVenueById } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
  MdPerson,
} from "react-icons/md";
import Rating from "../Rating";
import VenueOwner from "../VenueOwner";

function SingleVenueCard() {
  const { id } = useParams<{ id: string }>(); // Get the venue ID from the URL
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        if (id) {
          const venueById = await getVenueById(id);
          setVenue(venueById.data); // Set the venue data
          console.log(venueById);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch venue data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  // Construct Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city}, ${venue.location.country}`
  )}`;

  return (
    <div className="container max-w-6lg grid">
      <div className="w-full max-h-64 overflow-hidden mt-6">
        <div className="flex gap-4 pl-8">
          <h2 className="text-3xl font-semibold mb-4">{venue.name}</h2>
          <Rating rating={venue.rating} />
        </div>
        <img
          className="w-full h-full object-cover"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>
      <div className="w-full h-full pl-6">
        <div className="flex items-center p-4">
          <IoLocation className="text-lg" />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span>{venue.location.city}</span>
            <span>{venue.location.country}</span>
          </a>
        </div>
        <div>
          <p>{venue.description}</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-primary text-sm">
          {venue.meta.breakfast && (
            <div className="flex items-center">
              <MdFreeBreakfast title="Breakfast included" />
              <span className="ml-1 text-sm leading-6">Breakfast included</span>
            </div>
          )}
          {venue.meta.wifi && (
            <div className="flex items-center">
              <MdWifi title="Wi-Fi available" />
              <span className="ml-1 text-sm leading-6">Wi-Fi available</span>
            </div>
          )}
          {venue.meta.parking && (
            <div className="flex items-center">
              <MdDirectionsCar title="Parking available" />
              <span className="ml-1 text-sm leading-6">Parking available</span>
            </div>
          )}
          {venue.meta.pets && (
            <div className="flex items-center">
              <MdPets title="Pets allowed" />
              <span className="ml-1 text-sm leading-6">Pets allowed</span>
            </div>
          )}
          {venue.maxGuests && (
            <div className="flex items-center">
              <MdPerson title="Max guests" />
              <span className="ml-1 text-sm leading-6">
                Max guests: {venue.maxGuests}
              </span>
            </div>
          )}
        </div>
        <VenueOwner owner={venue.owner} />
      </div>
    </div>
  );
}

export default SingleVenueCard;
