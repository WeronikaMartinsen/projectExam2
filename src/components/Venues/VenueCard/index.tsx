import React, { useEffect, useRef, useState } from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { IoLocation } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdWifi,
  MdDirectionsCar,
  MdPets,
  MdPerson,
  MdEdit,
} from "react-icons/md";
import Rating from "../Rating";
import { getUser } from "../../../service/Utils/userUtils";
import { useNavigate } from "react-router-dom";
import { useDeleteVenue } from "../../Hooks/useDelateVenue";
import DeleteConfirmationModal from "../../Modals/DelateConfirmation"; // Ensure correct import path

interface VenueCardProps {
  venue: Venue;
  onClick: (id: string) => void; // If you still want to keep the onClick prop for other purposes
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null); // Add this state to store the venue ID
  const navigate = useNavigate(); // Get the navigate function

  const user = getUser();
  const token = user?.accessToken || "";

  const { loading, data, deleteVenue } = useDeleteVenue(token || "");

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.location.city} ${venue.location.country}`
  )}`;

  const handleToggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the list item
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`/venues/${venue.id}`, {
      state: { venue },
    });
  };

  const handleOpenModal = (venueId: string) => {
    setVenueToDelete(venueId); // Set the venue to delete
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVenueToDelete(null); // Reset the venue ID
  };

  const handleDelete = async (venueId: string) => {
    if (loading) return; // Avoid multiple deletion requests

    try {
      // Proceed with deletion
      await deleteVenue(venueId);

      // Check if data is available and deletion was successful
      if (!data) {
        alert(`Venue with ID: ${venueId} successfully deleted`);

        // Close the modal and reset the venueToDelete state
        setIsModalOpen(false);
        setVenueToDelete(null);
        window.location.reload(); // Reload the page
      } else {
        // Handle case when no data is returned but deletion might still have occurred
        alert("Failed to delete the venue.");
      }
    } catch (error) {
      // If an error occurs, log it and notify the user
      console.error("Error during venue deletion:", error);
      alert("An error occurred while trying to delete the venue.");
    }
  };

  const handleNavigateToDetail = () => {
    navigate(`/venue/${venue.id}`); // Navigate to the venue detail page when image is clicked
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
          onClick={handleNavigateToDetail} // Use navigate on image click
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

        <div className="flex flex-col gap-2 mt-4 text-primary text-sm">
          {venue.meta.breakfast && (
            <div className="flex items-center">
              <MdFreeBreakfast title="Breakfast included" />
              <span className="ml-1 text-sm leading-6">Breakfast</span>
            </div>
          )}
          {venue.meta.wifi && (
            <div className="flex items-center">
              <MdWifi title="Wi-Fi available" />
              <span className="ml-1 text-sm leading-6">Wi-Fi</span>
            </div>
          )}
          {venue.meta.parking && (
            <div className="flex items-center">
              <MdDirectionsCar title="Parking available" />
              <span className="ml-1 text-sm leading-6">Parking</span>
            </div>
          )}
          {venue.meta.pets && (
            <div className="flex items-center">
              <MdPets title="Pets allowed" />
              <span className="ml-1 text-sm leading-6">Pets</span>
            </div>
          )}
          {venue.maxGuests && (
            <div className="flex items-center">
              <MdPerson title="Max guests" />
              <span className="ml-1 text-sm leading-6">
                Max guests: {venue.maxGuests}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="h-full w-full flex flex-col justify-end p-4">
        {user &&
          venue.owner?.name === user.name && ( // Check if user exists before checking name
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
      {/* Confirmation Modal */}
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
