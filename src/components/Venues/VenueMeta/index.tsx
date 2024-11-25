import React from "react";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
  MdPerson,
} from "react-icons/md";

interface VenueMetaProps {
  meta: {
    breakfast?: boolean;
    wifi?: boolean;
    parking?: boolean;
    pets?: boolean;
  };
  maxGuests?: number;
}

const VenueMeta: React.FC<VenueMetaProps> = ({ meta, maxGuests }) => (
  <div className="w-full max-w-2lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 text-sm">
    {meta.breakfast && (
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition">
        <MdFreeBreakfast
          title="Breakfast included"
          className="text-primary text-xl"
          aria-label="Breakfast included"
        />
        <span className="leading-6">Breakfast</span>
      </div>
    )}
    {meta.wifi && (
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition">
        <MdWifi
          title="Wi-Fi available"
          className="text-primary text-xl"
          aria-label="Wi-Fi available"
        />
        <span className="leading-6">Wi-Fi</span>
      </div>
    )}
    {meta.parking && (
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition">
        <MdDirectionsCar
          title="Parking available"
          className="text-primary text-xl"
          aria-label="Parking available"
        />
        <span className="leading-6">Parking</span>
      </div>
    )}
    {meta.pets && (
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition">
        <MdPets
          title="Pets allowed"
          className="text-primary text-xl"
          aria-label="Pets allowed"
        />
        <span className="leading-6">Pets</span>
      </div>
    )}
    {maxGuests && (
      <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 transition">
        <MdPerson
          title="Max guests"
          className="text-primary text-xl"
          aria-label={`Maximum guests: ${maxGuests}`}
        />
        <span className="leading-6">{maxGuests} Guests</span>
      </div>
    )}
  </div>
);

export default VenueMeta;
