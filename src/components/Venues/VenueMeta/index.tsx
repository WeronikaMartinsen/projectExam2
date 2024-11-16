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
  <div className="flex flex-col gap-2 mt-4 text-primary text-sm">
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
        <span className="ml-1 text-sm leading-6">Max guests: {maxGuests}</span>
      </div>
    )}
  </div>
);

export default VenueMeta;
