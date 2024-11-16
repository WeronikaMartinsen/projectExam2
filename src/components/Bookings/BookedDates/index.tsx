import React from "react";
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";

interface BookedDatesProps {
  bookings: Booking[];
}

const BookedDates: React.FC<BookedDatesProps> = ({ bookings }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-primary">
        Bookings for this venue:
      </h3>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-600">
          No bookings yet. Be the first to book!
        </p>
      ) : (
        <ul className="list-disc pl-6 space-y-3">
          {bookings.map((booking, idx) => (
            <li key={idx} className="flex justify-between items-center text-sm">
              <span>
                {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </span>
              <span className="font-semibold">Guests: {booking.guests}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedDates;
