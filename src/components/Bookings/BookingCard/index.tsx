import { Link } from "react-router-dom";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";
import { DateFormatter } from "../../../service/Utils/DateFormatter";

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
      className={`grid grid-cols-1 md:grid-cols-3 border border-primary rounded shadow-sm hover:shadow-md transition-transform transform p-4 ${
        isPastBooking ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      }`}
    >
      <div className="col-span-1 md:col-span-2">
        <div className="flex text-center">
          <h1 className="text-xs mb-2 text-center">Order</h1>
          <span className="w-full text-xs">#{booking.id}</span>
        </div>
        <p>Booked: {DateFormatter(booking.created)}</p>
        <p className="text-sm text-gray-600">Guests: {booking.guests}</p>
        <p className="text-sm text-gray-600">
          From: {new Date(booking.dateFrom).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          To: {new Date(booking.dateTo).toLocaleDateString()}
        </p>
      </div>
      {booking.venue && (
        <div className="flex flex-col justify-center items-end">
          <h4 className="text-md mt-2">Venue: {booking.venue.name}</h4>
          <Link
            to={`/venue/${booking.venue.id}`}
            className="block text-accent p-2 rounded-md text-sm mt-2"
          >
            View Venue
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
