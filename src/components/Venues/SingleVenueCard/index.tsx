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
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";
import Calender from "../../Bookings/Calender";
import LoadingSkeleton from "../../Skeleton";

function SingleVenueCard() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]); // State for bookings

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        if (id) {
          const venueById = await getVenueById(id);
          setVenue(venueById.data);
          setBookings(venueById.data.bookings || []); // Set bookings
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

  if (loading) return <LoadingSkeleton width="400px" height={40} />;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  // Construct Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city}, ${venue.location.country}`
  )}`;

  return (
    <div className="container max-w-6lg grid">
      <div className="w-full max-h-64 overflow-hidden mt-6">
        <div className="flex gap-2 pl-2">
          <h2 className="text-3xl font-semibold mb-4">{venue.name}</h2>
          <Rating rating={venue.rating} />
        </div>
        <img
          className="w-full h-full object-cover rounded-lg shadow"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>
      <div className="w-full h-full bg-tertiary">
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

        <div className="grid grid-cols-1 md:grid-cols-2 justify-start p-3 gap-8 xs:gap-0 text-primary text-sm">
          <div className="flex flex-col justify-start items-start gap-4">
            <p>{venue.description}</p>
            <div className="flex gap-2 justify-center items-center">
              <span>Price:</span>
              <span className="text-2xl font-semibold">{venue.price} nok</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span>Bookings:</span>
              <span className="font-semibold">{venue._count.bookings}</span>
            </div>
            {/* Render the Calendar */}
            <Calender bookings={bookings} />
          </div>
          <div className="flex flex-col w-full h-full">
            {venue.meta.breakfast && (
              <div className="flex items-center">
                <MdFreeBreakfast title="Breakfast included" />
                <span className="ml-1 text-sm leading-6">
                  Breakfast included
                </span>
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
                <span className="ml-1 text-sm leading-6">
                  Parking available
                </span>
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
            <div className="mt-4 flex flex-col align-top justify-start">
              <span>Contact the owner:</span>
              <VenueOwner owner={venue.owner} />
            </div>
          </div>
        </div>
        <button className="w-full bg-accent p-3 rounded-md font-semibold text-sm mt-4 text-primary">
          BOOK
        </button>
      </div>
    </div>
  );
}

export default SingleVenueCard;
