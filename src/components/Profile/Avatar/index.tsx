import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  getUser,
  deleteUser,
  isLoggedIn,
} from "../../../service/Utils/userUtils";

function Avatar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = getUser();
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown

  const avatarUrl = user?.avatar?.url || "/default-avatar.png";

  // Toggles the dropdown visibility
  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout and refresh the page after logout
  const handleLogout = () => {
    deleteUser();
    window.location.reload();
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return isLoggedIn() ? (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggleDropdown}>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 w-48 bg-white border shadow-lg z-20 pt-3">
          <span className="text-sm font-semibold leading-6 text-gray-900 pl-4">
            {user.name}
          </span>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  ) : (
    <button className="text-sm font-semibold leading-6 text-gray-900">
      Log in <span aria-hidden="true">&rarr;</span>
    </button>
  );
}

export default Avatar;
