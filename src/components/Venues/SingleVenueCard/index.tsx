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
import SuccessMessage from "../../UserMessages/SuccessMessage";
import BookingCard from "../../Bookings/BookingCard";

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

  const handleBook = () => {
    if (
      venue &&
      selectedFromDate &&
      selectedToDate &&
      user &&
      "accessToken" in user
    ) {
      const bookingData = {
        venueId: venue.id,
        dateFrom: selectedFromDate,
        dateTo: selectedToDate,
        guests,
      };

      createBooking(bookingData, user.accessToken)
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

  if (error) return <div className="mt-10 text-danger">Error: {error}</div>;
  if (!venue) return <div className="mt-10 text-danger">Venue not found</div>;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city}, ${venue.location.country}`
  )}`;

  return (
    <div className="container max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-lg w-full">
      {/* Full-width image */}
      <div className="w-full h-64 overflow-hidden rounded mb-6">
        <img
          className="w-full h-full object-cover"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>

      {/* Venue Header */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">{venue.name}</h2>
          <div className="flex items-center gap-2">
            <Rating rating={venue.rating} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <IoLocation className="text-primary text-xl" />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-700"
          >
            {venue.location.city}, {venue.location.country}
          </a>
        </div>
      </div>

      {/* Venue Info */}
      <div className="mb-6 space-y-4">
        <p className="text-gray-700 leading-6 p-2">{venue.description}</p>

        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <div>
            <span className="font-medium text-gray-600">Price:</span>{" "}
            <span className="text-lg font-semibold text-primary">
              {venue.price} NOK
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Bookings:</span>{" "}
            <span className="font-semibold text-gray-800">
              {venue._count.bookings}
            </span>
          </div>
        </div>

        {/* Features */}
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </div>

      {/* Calendar Section */}
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
          <span className="text-lg font-semibold text-gray-800 mb-4 block">
            Available Dates
          </span>
          <div className="w-full flex justify-center">
            <Calender
              bookings={bookings}
              onDateRangeSelect={(fromDate, toDate) => {
                setSelectedFromDate(fromDate);
                setSelectedToDate(toDate);
              }}
            />
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-6">
        {user ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <BookingForm
              venue={venue}
              selectedFromDate={selectedFromDate || ""}
              selectedToDate={selectedToDate || ""}
              setSelectedFromDate={setSelectedFromDate}
              setSelectedToDate={setSelectedToDate}
              guests={guests}
              setGuests={setGuests}
              handleBook={handleBook}
              bookings={bookings}
            />
          </div>
        ) : (
          <MessageWithRedirect
            message="You must be logged in to book this venue!"
            redirectTo="/login"
            buttonText="Login now"
            autoRedirect={false}
          />
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
      {user && (
        <div className="mt-8">
          <span className="text-lg font-semibold text-gray-800 block mb-4">
            Contact the host:
          </span>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <VenueOwner owner={venue.owner} />
          </div>
        </div>
      )}

      {/* Booked Dates */}
      {bookings.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booked Dates
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isPastBooking={new Date(booking.dateTo) < new Date()}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleVenueCard;
