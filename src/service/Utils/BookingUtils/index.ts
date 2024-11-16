import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";

// Helper function to sort bookings by date
export const sortBookingsByDate = (bookings: BookingWithDetails[]) => {
  return [...bookings].sort((a, b) => {
    const dateA = new Date(a.dateFrom).getTime();
    const dateB = new Date(b.dateFrom).getTime();
    return dateA - dateB;
  });
};

// Helper function to separate bookings into past and upcoming
export const separateBookings = (bookings: BookingWithDetails[]) => {
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.dateFrom) >= new Date()
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.dateFrom) < new Date()
  );
  return { upcomingBookings, pastBookings };
};
