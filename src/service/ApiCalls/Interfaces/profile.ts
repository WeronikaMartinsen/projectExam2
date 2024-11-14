import { Booking } from "./bookings";
import { Venue } from "./venue";

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

export interface Profile {
  bookings?: Booking[] | null;
  name: string;
  email: string;
  bio?: string | null;
  avatar?: Avatar | null;
  banner?: Banner | null;
  venueManager?: boolean;
  venues: Venue[];
  _count?: {
    venues: number;
    bookings: number;
  };
}

export interface UpdatedProfileData {
  bio?: string;
  avatar?: Avatar | null;
  banner?: Banner | null;
  venueManager?: boolean;
}
