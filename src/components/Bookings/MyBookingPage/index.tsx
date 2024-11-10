import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { getBookingByProfile } from "../../../service/apiRequests";
import BookingCard from "../BookingCard";
import LoadingSkeleton from "../../Skeleton";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

const MyBookingsPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = user?.accessToken;

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      const fetchBookings = async () => {
        try {
          // Fetch the bookings as an array directly
          const bookingsData = await getBookingByProfile(
            user.name,
            accessToken
          );
          setBookings(bookingsData); // Now this should work because it's an array
        } catch (error) {
          console.error(error);
          setError("Failed to fetch bookings");
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
      setLoading(false);
      setError("You must be logged in to view your bookings.");
    }
  }, [isLoggedIn, accessToken, user?.name]); // Correct dependency array

  // If loading, show skeleton
  if (loading) {
    return <LoadingSkeleton width="100%" height={50} />;
  }

  // If there's an error, display it
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

      {/* If there are no bookings */}
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">
          You have no bookings yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
