export interface Venue {
  id?: number;
  name: string;
  location: string;
  description?: string;
}

export interface VenueResponse {
  id: number;
  name: string;
  location: string;
  description?: string;
}
