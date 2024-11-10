import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { getBookingByProfile } from "../../../service/apiRequests";
import BookingCard from "../BookingCard";
import LoadingSkeleton from "../../Skeleton";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

// Helper function to calculate days left until travel
const daysUntilTravel = (travelDate: string) => {
  const travelDateObj = new Date(travelDate);
  const currentDate = new Date();
  const timeDiff = travelDateObj.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days
  return daysLeft;
};

const MyBookingsPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && user?.name) {
      const fetchBookings = async () => {
        try {
          const bookingsData = await getBookingByProfile(
            user.name,
            user.accessToken
          );
          setBookings(bookingsData);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch bookings.");
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
      setLoading(false);
      setError("You must be logged in to view your bookings.");
    }
  }, [isLoggedIn, user?.name, user?.accessToken]);

  if (loading) {
    return <LoadingSkeleton width="100%" height={50} />;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.dateFrom).getTime();
    const dateB = new Date(b.dateFrom).getTime();
    return dateA - dateB;
  });

  // Separate upcoming and past bookings
  const upcomingBookings = sortedBookings.filter(
    (booking) => new Date(booking.dateFrom) >= new Date()
  );
  const pastBookings = sortedBookings.filter(
    (booking) => new Date(booking.dateFrom) < new Date()
  );

  return (
    <div className="container max-w-2xl p-4">
      <h1 className="text-2xl mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">
          You have no bookings yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Display the first upcoming booking with a border */}
          {upcomingBookings.length > 0 && (
            <div className="border-l-4 border-accent p-4 mb-6 bg-tertiary">
              <span className="text-lg font-semibold">Your next travel</span>
              <p className="text-sm text-gray-500 mt-2 mb-2">
                {daysUntilTravel(upcomingBookings[0].dateFrom)}{" "}
                {daysUntilTravel(upcomingBookings[0].dateFrom) === 1
                  ? "day"
                  : "days"}{" "}
                left until travel
              </p>
              <BookingCard
                booking={upcomingBookings[0]}
                isPastBooking={false}
              />
            </div>
          )}

          {/* Display the rest of the upcoming bookings */}
          {upcomingBookings.slice(1).map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isPastBooking={false} // Upcoming booking
            />
          ))}

          {pastBookings.length > 0 && (
            <div className="mt-8 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Last Travel</h3>
              {pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isPastBooking={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
