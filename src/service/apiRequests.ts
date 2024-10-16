import { apiRequest, ApiResponse } from "./ApiCalls/baseApiCallPost";
import { Venue } from "./ApiCalls/Interfaces/venue";

// API Calls Using the New apiRequest Function

// GET Venues
export const getVenues = async (): Promise<ApiResponse<Venue[]>> => {
  return apiRequest<null, Venue[]>("/venues", "GET");
};

// GET Venue by ID
export const getVenueById = async (id: number): Promise<ApiResponse<Venue>> => {
  return apiRequest<null, Venue>(`/venues/${id}`, "GET");
};

// POST (Create) a New Venue
export const createVenue = async (
  venue: Venue,
  token: string
): Promise<ApiResponse<Venue>> => {
  return apiRequest<Venue, Venue>("/venues", "POST", venue, token);
};

// PUT (Update) a Venue
export const updateVenue = async (
  id: number,
  venue: Venue,
  token: string
): Promise<ApiResponse<Venue>> => {
  return apiRequest<Venue, Venue>(`/venues/${id}`, "PUT", venue, token);
};

// DELETE a Venue
export const deleteVenue = async (
  id: number,
  token: string
): Promise<ApiResponse<null>> => {
  return apiRequest<null, null>(`/venues/${id}`, "DELETE", undefined, token);
};
