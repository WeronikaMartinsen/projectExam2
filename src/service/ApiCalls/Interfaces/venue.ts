// Interfaces for venue-related data

export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
}

export interface Location {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
}

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: {
    name: string;
    email: string;
    bio: string;
    avatar: Media;
    banner: Media;
  };
}

export interface _Count {
  bookings: number;
}

export interface Venue {
  _count: _Count;
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner; // Optional based on query parameters
  bookings?: Booking[]; // Optional based on query parameters
}

export interface VenueResponse {
  data: Venue[]; // Array of Venue objects
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
  };
}

export interface VenueCreate {
  name: string; // Required
  description: string; // Required
  media?: Media[]; // Optional
  price: number; // Required
  maxGuests: number; // Required
  rating?: number | null; // Optional (default: 0)
  meta?: Meta; // Optional
  location?: Location | null; // Allow undefined or null
}

export interface VenueUpdate {
  name?: string;
  description?: string;
  media?: Media[];
  price?: number;
  maxGuests?: number;
  rating?: number | null;
  meta?: Meta;
  location?: Location | null;
}
