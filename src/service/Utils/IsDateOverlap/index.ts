import { Booking } from "../../ApiCalls/Interfaces/bookings";

export const isDateOverlap = (
  selectedFrom: string,
  selectedTo: string,
  existingBookings: Booking[]
): boolean => {
  return existingBookings.some((booking) => {
    const bookingStart = new Date(booking.dateFrom).getTime();
    const bookingEnd = new Date(booking.dateTo).getTime();
    const selectedStart = new Date(selectedFrom).getTime();
    const selectedEnd = new Date(selectedTo).getTime();

    return (
      (selectedStart >= bookingStart && selectedStart <= bookingEnd) || // Starts during an existing booking
      (selectedEnd >= bookingStart && selectedEnd <= bookingEnd) || // Ends during an existing booking
      (selectedStart <= bookingStart && selectedEnd >= bookingEnd) // Completely overlaps an existing booking
    );
  });
};