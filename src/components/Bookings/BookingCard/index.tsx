interface BookingCardProps {
  booking: BookingWithDetails;
  isPastBooking: boolean;
  daysLeft?: number;
}

import { Link } from "react-router-dom";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

interface BookingCardProps {
  booking: BookingWithDetails;
  isPastBooking: boolean;
  daysLeft?: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isPastBooking,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform ${
        isPastBooking ? "bg-gray-100" : "bg-white"
      }`}
    >
      {/* Venue Image */}
      <div className="relative rounded-lg overflow-hidden h-48 md:h-56 w-full">
        <img
          key={booking.venue?.id}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          src={
            booking.venue?.media?.[0]?.url ||
            "https://via.placeholder.com/300?text=No+Image+Available"
          }
          alt={booking.venue?.name || "Venue"}
        />
      </div>

      {/* Booking Details */}
      <div className="col-span-1 md:col-span-2 flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Booked: {new Date(booking.created).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p className="text-sm text-gray-600">
              <strong>From:</strong>{" "}
              {new Date(booking.dateFrom).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>To:</strong>{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Venue Details */}
        {booking.venue && (
          <div className="mt-4 flex justify-between items-center">
            <h4 className="text-md font-semibold text-gray-800">
              {booking.venue.name}
            </h4>
            <Link
              to={`/venue/${booking.venue.id}`}
              className={`${
                isPastBooking
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-primary text-white hover:bg-primary-dark"
              } py-2 px-4 text-sm text-center font-semibold rounded-lg transition-colors`}
            >
              View Venue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
