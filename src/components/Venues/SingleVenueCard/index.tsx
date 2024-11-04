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
  MdEdit,
} from "react-icons/md";
import Rating from "../Rating";
import VenueOwner from "../VenueOwner";
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";
import Calender from "../../Bookings/Calender";
import LoadingSkeleton from "../../Skeleton";
import { getUser } from "../../../service/Utils/userUtils";

function SingleVenueCard() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const user = getUser(); // Get current user

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        if (id) {
          const venueById = await getVenueById(id);
          setVenue(venueById.data);
          setBookings(venueById.data.bookings || []);
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

  const handleToggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log("Edit venue", venue?.id);
    // Handle edit logic (e.g., navigate to edit page)
  };

  const handleDelete = () => {
    console.log("Delete venue", venue?.id);
    // Handle delete logic (e.g., API call to delete)
  };

  if (loading) return <LoadingSkeleton width="400px" height={40} />;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city}, ${venue.location.country}`
  )}`;

  return (
    <div className="container max-w-6lg grid mb-8">
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
            <Calender bookings={bookings} />
          </div>
          <div className="flex flex-col w-full h-full">
            <div>
              {/* Owner Options Dropdown */}
              {venue.owner?.name === user.name && (
                <div className="relative text-end">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={handleToggleDropdown}
                  >
                    <MdEdit className="inline-block mr-1" />
                    Edit
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 w-48 bg-white border shadow-lg z-20 pt-3">
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {venue.meta.breakfast && (
              <div className="flex items-center">
                <MdFreeBreakfast title="Breakfast included" />
                <span className="ml-1 text-sm leading-6">Breakfast</span>
              </div>
            )}
            {venue.meta.wifi && (
              <div className="flex items-center">
                <MdWifi title="Wi-Fi available" />
                <span className="ml-1 text-sm leading-6">Wi-Fi</span>
              </div>
            )}
            {venue.meta.parking && (
              <div className="flex items-center">
                <MdDirectionsCar title="Parking available" />
                <span className="ml-1 text-sm leading-6">Parking</span>
              </div>
            )}
            {venue.meta.pets && (
              <div className="flex items-center">
                <MdPets title="Pets allowed" />
                <span className="ml-1 text-sm leading-6">Pets</span>
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
