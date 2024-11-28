import { useState } from "react";
import { ApiResponse } from "../../../service/ApiCalls/baseApiCallPost";
import { Booking } from "../../../service/ApiCalls/Interfaces/bookings";

export const useBookingForm = (
  createBooking: (
    bookingData: {
      dateFrom: string;
      dateTo: string;
      guests: number;
      venueId: string;
    },
    token: string
  ) => Promise<ApiResponse<Booking>>,
  token: string
) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitBooking = async (bookingData: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  }) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await createBooking(bookingData, token);
      setSuccessMessage("Booking created successfully!");
      return response.data.id;
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, errorMessage, submitBooking };
};
