import React from "react";
import { Booking, Venue } from "../../../service/ApiCalls/Interfaces/venue";
import VenueOwner from "../../Venues/VenueOwner";
import { getUser } from "../../../service/Utils/userUtils";

interface BookedDatesProps {
  bookings: Booking[];
  venue: Venue;
}

const BookedDates: React.FC<BookedDatesProps> = ({ bookings, venue }) => {
  const user = getUser();

  return (
    <div className="mt-10 max-w-md flex flex-col justify-start">
      <span className="text-md text-start font-semibold mb-4">
        Bookings for this venue:
      </span>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-600">
          This venue does not have bookings yet.
        </p>
      ) : (
        <ul className="list-disc pl-6 space-y-6">
          {bookings.map((booking, idx) => {
            const dateFrom = new Date(booking.dateFrom);
            const dateTo = new Date(booking.dateTo);
            const nights = Math.ceil(
              (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)
            );
            const totalPrice = nights * venue.price;

            return (
              <li
                key={idx}
                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <span className="text-sm text-gray-800">
                  <strong>Booking ID:</strong> {booking.id}
                </span>
                <span className="text-sm text-gray-800">
                  <strong>Date Range:</strong> {dateFrom.toLocaleDateString()} -{" "}
                  {dateTo.toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-800">
                  <strong>Number of Nights:</strong> {nights}
                </span>
                <span className="text-sm text-gray-800">
                  <strong>Guests:</strong> {booking.guests}
                </span>
                <span className="text-sm text-gray-800">
                  <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-800">
                  <strong>Booked by:</strong> {booking.customer.name}
                </span>

                {/* Contact Owner */}
                {user && (
                  <div className="mt-4">
                    <span className="text-sm font-semibold text-gray-800 block mb-2">
                      Contact the host:
                    </span>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <VenueOwner owner={venue.owner} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookedDates;
