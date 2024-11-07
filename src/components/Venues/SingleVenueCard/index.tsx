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
import { getUser } from "../../../service/Utils/userUtils";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../service/apiRequests";

function SingleVenueCard() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedFromDate, setSelectedFromDate] = useState<string | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(1); // Default to 1 guest

  const user = getUser();
  const navigate = useNavigate();

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

  const token = localStorage.getItem("accessToken");

  const handleBook = () => {
    if (!user) {
      // If the user is not logged in, navigate to login page
      navigate("/login");
    } else if (venue && selectedFromDate && selectedToDate && token) {
      // Prepare the booking data
      const bookingData = {
        venueId: venue.id,
        dateFrom: selectedFromDate,
        dateTo: selectedToDate,
        guests,
      };

      console.log(token);

      // Pass the token as the second argument to `createBooking`
      createBooking(bookingData, token)
        .then(() => {
          // After booking is created, navigate to the user's profile page
          navigate(`/profiles/${user.name}`);
        })
        .catch((err) => {
          setError(err.message); // Handle any errors that occur during booking
        });
    } else {
      setError("You need to be logged in to book.");
    }
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
          className="w-full h-full object-cover rounded shadow"
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
              <span className="text-xl font-semibold">{venue.price} NOK</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span>Bookings:</span>
              <span className="font-semibold">{venue._count.bookings}</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span className="mb-2">Check available dates:</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Calender
                bookings={bookings}
                onDateRangeSelect={(fromDate: string, toDate: string) => {
                  setSelectedFromDate(fromDate);
                  setSelectedToDate(toDate);
                }}
              />
            </div>

            {/* Display selected date range */}
            {selectedFromDate && selectedToDate && (
              <p className="mt-2 text-sm">
                Selected Dates:{" "}
                {new Date(selectedFromDate).toLocaleDateString()} -{" "}
                {new Date(selectedToDate).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full h-full">
            {venue.meta.breakfast && (
              <div className="flex items-center">
                <MdFreeBreakfast title="Breakfast included" />
                <span className="ml-1 text-sm leading-6">Breakfast</span>
              </div>
            )}
            {venue.meta.wifi && (
              <div className="flex items-center mt-1">
                <MdWifi title="Wi-Fi available" />
                <span className="ml-1 text-sm leading-6">Wi-Fi</span>
              </div>
            )}
            {venue.meta.parking && (
              <div className="flex items-center mt-1">
                <MdDirectionsCar title="Parking available" />
                <span className="ml-1 text-sm leading-6">Parking</span>
              </div>
            )}
            {venue.meta.pets && (
              <div className="flex items-center mt-1">
                <MdPets title="Pets allowed" />
                <span className="ml-1 text-sm leading-6">Pets</span>
              </div>
            )}
            {venue.maxGuests && (
              <div className="flex items-center mt-1">
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
            {/* Booking Form */}
            <div className="mt-6">
              <h3 className="text-xl mb-4">Book This Venue</h3>
              <form className="flex flex-col">
                <div className="mb-4 flex flex-col">
                  <label className="text-sm">From Date</label>
                  <input
                    type="date"
                    value={selectedFromDate || ""}
                    onChange={(e) => setSelectedFromDate(e.target.value)}
                    className="p-2 border rounded"
                    min={new Date().toISOString().split("T")[0]} // Prevent past date
                  />
                </div>

                <div className="mb-4 flex flex-col">
                  <label className="text-sm">To Date</label>
                  <input
                    type="date"
                    value={selectedToDate || ""}
                    onChange={(e) => setSelectedToDate(e.target.value)}
                    className="p-2 border rounded"
                    min={selectedFromDate || ""}
                  />
                </div>

                <div className="mb-4  flex flex-col">
                  <label className="text-sm">Number of Guests</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) =>
                      setGuests(
                        Math.max(
                          1,
                          Math.min(venue.maxGuests, Number(e.target.value))
                        )
                      )
                    }
                    className="p-2 border rounded"
                    min={1}
                    max={venue.maxGuests}
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-accent p-3 rounded font-semibold text-sm mt-4 text-primary"
                  onClick={handleBook}
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVenueCard;
