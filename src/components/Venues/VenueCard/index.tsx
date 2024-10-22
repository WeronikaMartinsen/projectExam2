// VenueCard.tsx
import React from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
} from "react-icons/md";
import Rating from "../Rating";

interface VenueCardProps {
  venue: Venue;
  onClick: (id: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  return (
    <li
      key={venue.id}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md hover:shadow-lg transition-transform transform"
      onClick={() => onClick(venue.id)}
    >
      <div className="venue-image-container w-full h-48 md:h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>
      <div className="venue-details flex flex-col justify-center">
        <h2 className="text-xl font-semibold">{venue.name}</h2>
        <Rating rating={venue.rating} />
        <IoLocation />
        <div className="flex flex-col gap-3 mt-6 text-primary text-sm">
          {venue.meta.breakfast && (
            <div className="flex items-center">
              <MdFreeBreakfast title="Breakfast included" />
              <span className="ml-1">Breakfast included</span>
            </div>
          )}
          {venue.meta.wifi && (
            <div className="flex items-center">
              <MdWifi title="Wi-Fi available" />
              <span className="ml-1">Wi-Fi available</span>
            </div>
          )}
          {venue.meta.parking && (
            <div className="flex items-center">
              <MdDirectionsCar title="Parking available" />
              <span className="ml-1">Parking available</span>
            </div>
          )}
          {venue.meta.pets && (
            <div className="flex items-center">
              <MdPets title="Pets allowed" />
              <span className="ml-1">Pets allowed</span>
            </div>
          )}
        </div>
      </div>
      <div className="venue-price flex items-center justify-center">
        <p className="text-lg font-bold text-blue-600">Price: ${venue.price}</p>
      </div>
    </li>
  );
};

export default VenueCard;
