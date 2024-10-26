import { Profile } from "./profile";
import { Venue } from "./venue";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface BookingWithDetails extends Booking {
  venue?: Venue;
  customer?: Profile;
}
