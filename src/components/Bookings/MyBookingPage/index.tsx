import React from "react";
import LoadingSkeleton from "../../Skeleton";
import { daysUntilTravel } from "../../../service/Utils/DateUtils";
import useBookings from "../../Hooks/useBookings";
import BookingCard from "../BookingCard";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

const MyBookingsPage: React.FC = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) {
    return (
      <div className="container max-w-2xl p-4">
        <LoadingSkeleton width="100%" height={50} />
        <LoadingSkeleton width="100%" height={50} />
        <LoadingSkeleton width="100%" height={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-2xl p-4">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const { upcomingBookings, pastBookings } = bookings;

  if (upcomingBookings.length === 0 && pastBookings.length === 0) {
    return (
      <div className="container max-w-2xl p-4 text-center text-gray-500">
        You have no bookings yet.
      </div>
    );
  }

  return (
    <div className="container max-w-2xl p-4">
      <h1 className="text-2xl mb-4">My Bookings</h1>

      {/* Upcoming Booking Section */}
      {upcomingBookings.length > 0 && (
        <>
          <div className="border-l-4 border-accent p-4 mb-6 bg-tertiary">
            <span className="text-lg font-semibold">Your next travel</span>
            <p className="text-sm text-gray-500 mt-2 mb-2">
              {daysUntilTravel(upcomingBookings[0].dateFrom)}{" "}
              {daysUntilTravel(upcomingBookings[0].dateFrom) === 1
                ? "day"
                : "days"}{" "}
              left until travel
            </p>
            <BookingCard booking={upcomingBookings[0]} isPastBooking={false} />
          </div>

          {/* Display the rest of the upcoming bookings */}
          {upcomingBookings.slice(1).map((booking: BookingWithDetails) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isPastBooking={false}
            />
          ))}
        </>
      )}

      {/* Past Booking Section */}
      {pastBookings.length > 0 && (
        <div className="mt-8 flex flex-col gap-2">
          <h3 className="text-lg">Last Travel</h3>
          {pastBookings.map((booking: BookingWithDetails) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isPastBooking={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
