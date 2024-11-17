import React from "react";
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";

interface BookedDatesProps {
  bookings: Booking[];
}

const BookedDates: React.FC<BookedDatesProps> = ({ bookings }) => {
  return (
    <div className="mt-10 max-w-md flex flex-col justify-start">
      <span className="text-md text-start font-semibold mb-4">
        Bookings for this venue:
      </span>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-600">
          No bookings yet. Be the first to book!
        </p>
      ) : (
        <ul className="list-disc pl-6 space-y-3">
          {bookings.map((booking, idx) => (
            <li key={idx} className="flex justify-start items-start text-sm">
              <span>
                {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedDates;
