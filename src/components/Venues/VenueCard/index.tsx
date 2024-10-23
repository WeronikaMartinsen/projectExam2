import React from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
  MdGroups,
} from "react-icons/md";
import Rating from "../Rating";

interface VenueCardProps {
  venue: Venue;
  onClick: (id: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  // Construct a Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city} ${venue.location.country}`
  )}`;

  return (
    <li
      key={venue.id}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-tertiary border border-accent shadow-sm hover:shadow-md transition-transform transform"
      onClick={() => onClick(venue.id)}
    >
      <div className="w-full h-48 md:h-64 overflow-hidden cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <IoLocation />
          {/* Link the location to Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span>{venue.location.city}</span>{" "}
            <span>{venue.location.country}</span>
          </a>
        </div>
        <h2 className="text-xl font-semibold">{venue.name}</h2>
        <Rating rating={venue.rating} />

        <div className="flex flex-col gap-3 mt-4 text-primary text-sm">
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
          {venue.maxGuests && (
            <div className="flex items-center">
              <MdGroups title="Max guests" />
              <span className="ml-1">Max guests: {venue.maxGuests}</span>
            </div>
          )}
        </div>
      </div>

      <div className="venue-price flex items-center justify-center border border-tertiary">
        <p className="text-lg font-bold text-secondary">
          Price: ${venue.price}
        </p>
      </div>
    </li>
  );
};

export default VenueCard;
