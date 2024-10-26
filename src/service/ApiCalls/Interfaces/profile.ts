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
  name: string;
  email: string;
  bio?: string | null;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
  venues: Venue[];
  _count?: {
    venues: number;
    bookings: number;
  };
}
