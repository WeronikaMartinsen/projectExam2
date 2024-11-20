import apiErrorHandler from "./Utils/apiErrorhandler";
import { apiRequest, ApiResponse } from "./ApiCalls/baseApiCallPost";
import { Venue, VenueCreate, VenueResponse } from "./ApiCalls/Interfaces/venue";
import { baseUrl, apiKeyUrl } from "./ApiCalls/Endpoints";
import { Profile } from "./ApiCalls/Interfaces/profile";
import { Booking, BookingWithDetails } from "./ApiCalls/Interfaces/bookings";

export const getVenues = async (
  page = 1,
  limit = 15,
  query = ""
): Promise<Venue[]> => {
  try {
    const headers = {
      "X-Noroff-API-Key": apiKeyUrl,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${baseUrl}/holidaze/venues?_owner=true&_bookings=true&page=${page}&limit=${limit}&search=${query}`,
      { method: "GET", headers }
    );

    if (!response.ok) throw new Error(response.statusText);

    const data: VenueResponse = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Get venue by ID
export const getVenueById = async (id: string): Promise<ApiResponse<Venue>> => {
  try {
    return await apiRequest<null, Venue>(
      `/holidaze/venues/${id}?_owner=true&_bookings=true`,
      "GET"
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

export const createVenue = async (
  venue: VenueCreate,
  token: string
): Promise<ApiResponse<Venue>> => {
  try {
    return await apiRequest<VenueCreate, Venue>(
      "/holidaze/venues",
      "POST",
      venue,
      token
    );
  } catch (error) {
    const apiError = apiErrorHandler(error);
    throw new Error(apiError.message);
  }
};

export const updateVenue = async (
  id: string,
  data: VenueCreate,
  token: string
): Promise<ApiResponse<Venue>> => {
  try {
    const response = await fetch(`${baseUrl}/holidaze/venues/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKeyUrl,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();

    // Return the response in the ApiResponse<Venue> format
    return { data: result }; // Assuming the API returns the updated venue data
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Delete a venue
export const deleteVenue = async (
  id: string,
  token: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${baseUrl}/holidaze/venues/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKeyUrl,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.status === 204) {
      return { data: null };
    }

    return await response.json();
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Get profile
export const getProfile = async (
  name: string,
  accessToken: string,
  bookings = true
): Promise<ApiResponse<Profile>> => {
  try {
    const bookingsQuery = bookings ? "?_bookings=true" : "";
    return await apiRequest<null, Profile>(
      `/holidaze/profiles/${name}${bookingsQuery}`,
      "GET",
      undefined,
      accessToken
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Update profile
export const updateProfile = async (
  name: string,
  updatedData: Profile,
  accessToken: string
): Promise<ApiResponse<Profile>> => {
  try {
    return await apiRequest<Profile, Profile>(
      `/holidaze/profiles/${name}`,
      "PUT",
      updatedData,
      accessToken
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Get venues by profile
export const getVenuesByProfile = async (
  name: string,
  accessToken: string
): Promise<ApiResponse<Venue[]>> => {
  try {
    return await apiRequest<null, Venue[]>(
      `/holidaze/profiles/${name}/venues?_owner=true&_bookings=true`,
      "GET",
      undefined,
      accessToken
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Get all bookings
export const getAllBookings = async (
  token: string,
  _customer = true,
  _venue = true
): Promise<BookingWithDetails[]> => {
  try {
    const queryParams = `?_customer=${_customer}&_venue=${_venue}`;
    const response = await apiRequest<null, BookingWithDetails[]>(
      `/holidaze/bookings${queryParams}`,
      "GET",
      undefined,
      token
    );
    return response.data;
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Get bookings by profile
export const getBookingByProfile = async (
  name: string,
  token: string
): Promise<BookingWithDetails[]> => {
  try {
    const response = await apiRequest<null, BookingWithDetails[]>(
      `/holidaze/profiles/${name}/bookings`,
      "GET",
      undefined,
      token
    );
    return response.data;
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
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
): Promise<ApiResponse<Booking>> => {
  try {
    return await apiRequest<typeof bookingData, Booking>(
      "/holidaze/bookings",
      "POST",
      bookingData,
      token
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Update an existing booking
export const updateBooking = async (
  bookingId: string,
  updatedData: Partial<Omit<Booking, "id" | "created" | "updated">>,
  token: string
): Promise<Booking> => {
  try {
    const response = await apiRequest<typeof updatedData, Booking>(
      `/holidaze/bookings/${bookingId}`,
      "PUT",
      updatedData,
      token
    );
    return response.data;
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};

// Delete a booking
export const deleteBooking = async (
  bookingId: string,
  token: string
): Promise<void> => {
  try {
    await apiRequest<null, void>(
      `/holidaze/bookings/${bookingId}`,
      "DELETE",
      undefined,
      token
    );
  } catch (error) {
    throw new Error(apiErrorHandler(error).message);
  }
};
