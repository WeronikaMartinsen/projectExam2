import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getUser,
  deleteUser,
  isLoggedIn,
} from "../../../service/Utils/userUtils";

function Avatar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = getUser();

  const avatarUrl = user?.avatar.url || "/default-avatar.png";

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    deleteUser();
    window.location.reload();
  };

  return isLoggedIn() ? (
    <div className="relative">
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
