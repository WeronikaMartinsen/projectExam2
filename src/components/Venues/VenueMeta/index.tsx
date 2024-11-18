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
  <div className="w-full grid grid-cols-2 gap-2 mt-4 text-sm justify-between align-middle items-center">
    {meta.breakfast && (
      <div className="flex items-center">
        <MdFreeBreakfast title="Breakfast included" />
        <span className="ml-1 text-sm leading-6">Breakfast</span>
      </div>
    )}
    {meta.wifi && (
      <div className="flex items-center">
        <MdWifi title="Wi-Fi available" />
        <span className="ml-1 text-sm leading-6">Wi-Fi</span>
      </div>
    )}
    {meta.parking && (
      <div className="flex items-center">
        <MdDirectionsCar title="Parking available" />
        <span className="ml-1 text-sm leading-6">Parking</span>
      </div>
    )}
    {meta.pets && (
      <div className="flex items-center">
        <MdPets title="Pets allowed" />
        <span className="ml-1 text-sm leading-6">Pets</span>
      </div>
    )}
    {maxGuests && (
      <div className="flex items-center">
        <MdPerson title="Max guests" />
        <span className="ml-1 text-sm leading-6">{maxGuests}</span>
      </div>
    )}
  </div>
);

export default VenueMeta;
