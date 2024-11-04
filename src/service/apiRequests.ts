import { apiRequest, ApiResponse } from "./ApiCalls/baseApiCallPost";
import { Venue, VenueCreate, VenueResponse } from "./ApiCalls/Interfaces/venue";
import { baseUrl } from "./ApiCalls/Endpoints";
import { apiKeyUrl } from "./ApiCalls/Endpoints";
import { Profile } from "./ApiCalls/Interfaces/profile";

import { Booking, BookingWithDetails } from "./ApiCalls/Interfaces/bookings";

export const getVenues = async (): Promise<Venue[]> => {
  const headers = {
    "X-Noroff-API-Key": apiKeyUrl,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(
      `${baseUrl}/holidaze/venues?_owner=true&_bookings=true`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: VenueResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// GET Venue by ID
export const getVenueById = async (id: string): Promise<ApiResponse<Venue>> => {
  return apiRequest<null, Venue>(
    `/holidaze/venues/${id}?_owner=true&_bookings=true`,
    "GET"
  );
};

export const createVenue = async (
  venue: VenueCreate,
  token: string
): Promise<ApiResponse<Venue>> => {
  console.log("Creating venue with data:", venue);
  console.log("Using token:", token);

  return apiRequest<VenueCreate, Venue>(
    "/holidaze/venues",
    "POST",
    venue,
    token
  );
};

// PUT (Update) a Venue
export const updateVenue = async (
  id: string,
  venue: Venue,
  token: string
): Promise<ApiResponse<Venue>> => {
  return apiRequest<Venue, Venue>(`/venues/${id}`, "PUT", venue, token);
};

// DELETE a Venue
export const deleteVenue = async (
  id: string,
  token: string
): Promise<ApiResponse<null>> => {
  return apiRequest<null, null>(`/venues/${id}`, "DELETE", undefined, token);
};

// Adjusted getProfile function to include bookings parameter
export const getProfile = async (
  name: string,
  accessToken: string,
  bookings = false // Optional parameter for including bookings
): Promise<ApiResponse<Profile>> => {
  const bookingsQuery = bookings ? "?_bookings=true" : "";
  return apiRequest<null, Profile>(
    `/holidaze/profiles/${name}${bookingsQuery}`,
    "GET",
    undefined,
    accessToken
  );
};

export const getVenuesByProfile = async (name: string, accessToken: string) => {
  return apiRequest<null, Venue[]>(
    `/holidaze/profiles/${name}/venues?_owner=true&_bookings=true`,
    "GET",
    undefined,
    accessToken
  );
};

// Fetch all bookings
export const getAllBookings = async (
  token: string,
  page = 1,
  includeCustomer = false,
  includeVenue = false
): Promise<BookingWithDetails[]> => {
  const queryParams = `?page=${page}&_customer=${includeCustomer}&_venue=${includeVenue}`;
  const response = await apiRequest<null, BookingWithDetails[]>(
    `/holidaze/bookings${queryParams}`,
    "GET",
    undefined,
    token
  );
  return response.data;
};

// Fetch a single booking by ID
export const getBookingById = async (
  bookingId: string,
  token: string
): Promise<BookingWithDetails> => {
  const response = await apiRequest<null, BookingWithDetails>(
    `/holidaze/bookings/${bookingId}`,
    "GET",
    undefined,
    token
  );
  return response.data;
};

// Create a new booking
export const createBooking = async (
  bookingData: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  },
  token: string
): Promise<Booking> => {
  const response = await apiRequest<typeof bookingData, Booking>(
    "/holidaze/bookings",
    "POST",
    bookingData,
    token
  );
  return response.data;
};

// Update an existing booking
export const updateBooking = async (
  bookingId: string,
  updatedData: Partial<Omit<Booking, "id" | "created" | "updated">>,
  token: string
): Promise<Booking> => {
  const response = await apiRequest<typeof updatedData, Booking>(
    `/holidaze/bookings/${bookingId}`,
    "PUT",
    updatedData,
    token
  );
  return response.data;
};

// Delete a booking
export const deleteBooking = async (
  bookingId: string,
  token: string
): Promise<void> => {
  await apiRequest<null, void>(
    `/holidaze/bookings/${bookingId}`,
    "DELETE",
    undefined,
    token
  );
};
