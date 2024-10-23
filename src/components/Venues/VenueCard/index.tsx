import React from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
  MdPerson,
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
      className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-6 bg-tertiary border border-light rounded-lg shadow-sm hover:shadow-md transition-transform transform"
      onClick={() => onClick(venue.id)}
    >
      <div className="w-full h-56 md:h-64 overflow-hidden cursor-pointer rounded-tl-lg rounded-bl-lg">
        <img
          className="w-full h-full object-cover"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
        />
      </div>
      <div className="flex flex-col items-center md:items-start md:border-r border-accent md:pr-4">
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
              <MdPerson title="Max guests" />
              <span className="ml-1">Max guests: {venue.maxGuests}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-end align-bottom p-4">
        <p className="text-2xl text-primary pl-8">{venue.price} nok</p>
        <button className="w-full bg-accent p-3 rounded-md font-semibold text-sm mt-4 text-primary">
          CHECK PRICE
        </button>
      </div>
    </li>
  );
};

export default VenueCard;
