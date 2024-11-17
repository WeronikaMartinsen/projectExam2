// VenueCard.tsx
import React, { useEffect, useRef, useState } from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import Rating from "../Rating";
import { getUser } from "../../../service/Utils/userUtils";
import { useNavigate } from "react-router-dom";
import { useDeleteVenue } from "../../Hooks/useDelateVenue";
import DeleteConfirmationModal from "../../Modals/DelateConfirmation";
import VenueMeta from "../VenueMeta";
import { MdEdit } from "react-icons/md";
import SuccessMessage from "../../UserMessages/SuccessMessage";

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const user = getUser();
  const token = user?.accessToken || "";

  const { loading, data, deleteVenue } = useDeleteVenue(token || "");

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city} ${venue.location.country}`
  )}`;

  const handleToggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`/venues/${venue.id}`, {
      state: { venue },
    });
  };

  const handleOpenModal = (venueId: string) => {
    setVenueToDelete(venueId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVenueToDelete(null);
  };

  const handleDelete = async (venueId: string) => {
    if (loading) return;

    try {
      await deleteVenue(venueId);

      if (!data) {
        setShowMessage(true);
        setTimeout(() => {}, 2000);
        setIsModalOpen(false);
        setVenueToDelete(null);
        window.location.reload();
      } else {
        alert("Failed to delete the venue.");
      }
    } catch (error) {
      console.error("Error during venue deletion:", error);
    }
  };

  const handleNavigateToDetail = () => {
    navigate(`/venue/${venue.id}`);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-6 bg-tertiary border border-light rounded transition-transform transform p-4">
      <div className="w-full h-56 md:h-64 overflow-hidden cursor-pointer rounded">
        <img
          key={venue.id}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
          onClick={handleNavigateToDetail}
        />
      </div>
      <div className="flex flex-col items-center md:items-start md:border-r border-accent md:pr-4">
        <div className="flex items-center gap-2 mb-2">
          <IoLocation />
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
        <h4 className="text-xl">{venue.name}</h4>
        <Rating rating={venue.rating} />
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </div>

      <div className="h-full w-full flex flex-col justify-end p-4">
        {user && venue.owner?.name === user.name && (
          <div className="relative mb-auto text-end">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={handleToggleDropdown}
            >
              <MdEdit className="inline-block mr-1" />
              Edit
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 w-48 bg-white border shadow-lg z-20 pt-3"
              >
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleOpenModal(venue.id)}
                >
                  Delete
                </button>
                {/* Success or Error Message */}
                {showMessage && (
                  <SuccessMessage
                    message="You have successfully delated your venue!"
                    duration={2000}
                    onClose={() => setShowMessage(false)}
                  />
                )}
              </div>
            )}
          </div>
        )}
        <div className=" w-full flex flex-col justify-between items-stretch">
          <p className="text-xl text-primary pl-8 text-end">
            {venue.price} NOK
          </p>
          <button
            onClick={handleNavigateToDetail}
            className="bg-accent p-3 rounded font-semibold text-sm mt-4 text-primary transition-all duration-300 ease-in-out transform hover:bg-accent-dark hover:scale-102 hover:shadow-md"
          >
            View details
          </button>
        </div>
      </div>

      <DeleteConfirmationModal
        open={isModalOpen}
        venueId={venueToDelete!}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
      />
    </li>
  );
};

export default VenueCard;
