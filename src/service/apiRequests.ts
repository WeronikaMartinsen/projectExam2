import { apiRequest, ApiResponse } from "./ApiCalls/baseApiCallPost";
import { VenueResponse, Venue } from "./ApiCalls/Interfaces/venue";
import { baseUrl } from "./ApiCalls/Endpoints";
import { apiKeyUrl } from "./ApiCalls/Endpoints";

export const getVenues = async (): Promise<VenueResponse[]> => {
  const headers = {
    "X-Noroff-API-Key": apiKeyUrl, // API Key from .env
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${baseUrl}/holidaze/venues`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // return the venues data
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// GET Venue by ID
export const getVenueById = async (id: string): Promise<ApiResponse<Venue>> => {
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
