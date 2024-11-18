import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVenueById } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import Rating from "../Rating";
import VenueMeta from "../VenueMeta";
import VenueOwner from "../VenueOwner";
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";
import Calender from "../../Bookings/Calender";
import LoadingSkeleton from "../../Skeleton";
import { getUser } from "../../../service/Utils/userUtils";
import { createBooking } from "../../../service/apiRequests";
import MessageWithRedirect from "../../UserMessages/MessageWithRedirect";
import BookingForm from "../../Forms/BookingForm";
import BookedDates from "../../Bookings/BookedDates";
import SuccessMessage from "../../UserMessages/SuccessMessage";

function SingleVenueCard() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedFromDate, setSelectedFromDate] = useState<string | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

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
    if (venue && selectedFromDate && selectedToDate && token) {
      const bookingData = {
        venueId: venue.id,
        dateFrom: selectedFromDate,
        dateTo: selectedToDate,
        guests,
      };

      createBooking(bookingData, token)
        .then(() => {
          setShowMessage(true);
          setTimeout(() => {
            navigate(`/profiles/${user.name}/bookings`);
          }, 2000);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please complete the booking details.");
    }
  };

  if (loading)
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <LoadingSkeleton width="100%" height="300px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton width="100%" height="200px" />
          <LoadingSkeleton width="100%" height="400px" />
        </div>
      </div>
    );

  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city}, ${venue.location.country}`
  )}`;

  return (
    <div className="container max-w-5xl mx-auto bg-tertiary p-6 rounded-lg shadow-md w-full">
      {/* Full-width image */}
      <div className="w-full h-64 overflow-hidden mb-6">
        <img
          className="w-full h-full object-cover rounded"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>

      {/* Venue Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {venue.name}
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <Rating rating={venue.rating} />
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <IoLocation className="text-primary text-lg" />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {venue.location.city} {venue.location.country}
          </a>
        </div>
      </div>

      {/* Venue Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600">{venue.description}</p>
          <div className="mt-4">
            <span className="text-md font-semibold">Price:</span>{" "}
            <span className="text-md text-primary">{venue.price} NOK</span>
          </div>
          <div className="mt-2">
            <span className="text-md font-semibold">Bookings:</span>{" "}
            <span>{venue._count.bookings}</span>
          </div>

          {/* Features */}
          <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
        </div>

        {/* Calendar Section */}
        <div className="flex flex-col align-top">
          <span className="text-md font-semibold text-center mb-4">
            Available Dates
          </span>
          <div className="flex justify-center items-center w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="w-full flex justify-center">
              <Calender
                bookings={bookings}
                onDateRangeSelect={(fromDate: string, toDate: string) => {
                  setSelectedFromDate(fromDate);
                  setSelectedToDate(toDate);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-6">
        {user ? (
          <BookingForm
            venue={venue}
            selectedFromDate={selectedFromDate || ""}
            selectedToDate={selectedToDate || ""}
            setSelectedFromDate={setSelectedFromDate}
            setSelectedToDate={setSelectedToDate}
            guests={guests}
            setGuests={setGuests}
            handleBook={handleBook}
          />
        ) : (
          <div></div>
        )}
      </div>

      {/* Success Message */}
      {showMessage && (
        <SuccessMessage
          message="Your booking was successful!"
          duration={2000}
          onClose={() => setShowMessage(false)}
        />
      )}

      {/* Contact Owner */}
      {user ? (
        <div className="mt-8">
          <span className="text-md font-semibold mb-4">Contact the host:</span>
          <VenueOwner owner={venue.owner} />
        </div>
      ) : (
        <MessageWithRedirect
          message="You must be logged in to book this venue!"
          redirectTo="/login"
          buttonText="Login now"
          autoRedirect={false}
        />
      )}

      {/* Booked Dates */}
      {user && (
        <div className="mt-6">
          <BookedDates bookings={bookings} />
        </div>
      )}
    </div>
  );
}

export default SingleVenueCard;
