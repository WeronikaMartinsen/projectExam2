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
  const token = user && "accessToken" in user ? user.accessToken : "";

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
    <li className="relative flex flex-col md:flex-row border border-light rounded overflow-hidden transition-transform transform hover:shadow-lg">
      {/* Image Section */}
      <div className="w-full md:w-80 h-36 md:h-auto overflow-hidden cursor-pointer rounded">
        <img
          key={venue.id}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
          onClick={handleNavigateToDetail}
        />
      </div>

      {/* Venue Details */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center gap-2">
            <IoLocation className="text-primary" />
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm text-gray-700"
            >
              {venue.location.city} {venue.location.country}
            </a>
          </div>
          {/* Floating Edit Button */}
          {user && venue.owner?.name === user.name && (
            <div className="flex justify-end">
              <div className="relative z-50">
                <button
                  className="p-2 border-gray shadow text-sm border rounded flex justify-center gap-2 items-center hover:shadow-md"
                  onClick={handleToggleDropdown}
                >
                  <MdEdit className="text-lg" />
                  <span>Update Venue</span>
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-40 bg-white border shadow-md z-10 rounded"
                  >
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={handleEdit}
                    >
                      Update Venue
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      onClick={() => handleOpenModal(venue.id)}
                    >
                      Delete Venue
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <h4 className="text-2xl font-bold text-gray-900">{venue.name}</h4>
        <Rating rating={venue.rating} />
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />

        {/* Action Button */}
        <div className="mt-6 flex flex-col justify-end items-center gap-4">
          <div className="flex justify-end text-end gap-2">
            <p className="text-md font-semibold text-end">{venue.price} NOK</p>
            <p className="text-xs mt-1">per night</p>
          </div>
          <button
            onClick={handleNavigateToDetail}
            className="bg-accent px-6 py-2 rounded font-semibold hover:bg-accent-dark transition duration-300 mt-4 w-56"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isModalOpen}
        venueId={venueToDelete!}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
      />
      {/* Success Message */}
      {showMessage && (
        <SuccessMessage
          message="Venue deleted successfully!"
          duration={2000}
          onClose={() => setShowMessage(false)}
        />
      )}
    </li>
  );
};

export default VenueCard;
