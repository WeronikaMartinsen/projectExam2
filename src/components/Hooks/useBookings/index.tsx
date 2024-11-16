import { useState, useEffect } from "react";
import { getBookingByProfile } from "../../../service/apiRequests";
import { useAuth } from "../../../context/useAuth";
import {
  sortBookingsByDate,
  separateBookings,
} from "../../../service/Utils/BookingUtils";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

interface BookingsState {
  upcomingBookings: BookingWithDetails[];
  pastBookings: BookingWithDetails[];
}

const useBookings = () => {
  const { user, isLoggedIn, loadingAuth } = useAuth();
  const [bookings, setBookings] = useState<BookingsState>({
    upcomingBookings: [],
    pastBookings: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loadingAuth) return;

    if (isLoggedIn && user?.name && user?.accessToken) {
      const fetchBookings = async () => {
        try {
          const bookingsData = await getBookingByProfile(
            user.name,
            user.accessToken
          );
          const sortedBookings = sortBookingsByDate(bookingsData);
          const { upcomingBookings, pastBookings } =
            separateBookings(sortedBookings);
          setBookings({ upcomingBookings, pastBookings });
        } catch (error) {
          console.error("Error fetching bookings:", error);
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
  }, [isLoggedIn, user, loadingAuth]);

  return { bookings, loading, error };
};

export default useBookings;
