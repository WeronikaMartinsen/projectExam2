import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import SuccessMessage from "../../UserMessages/SuccessMessage";

function Avatar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarUrl = user?.avatar?.url || "/default-avatar.png";

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEnterProfilePage = () => {
    navigate(`/profiles/${user?.name}`);
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
    navigate(`/`);
    setShowMessage(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      {showMessage && (
        <SuccessMessage
          message="You have successfully logged out."
          duration={3000}
          onClose={() => setShowMessage(false)}
        />
      )}
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <button onClick={handleToggleDropdown}>
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-10 h-10 rounded-full shadow-2xl"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute -left-20 w-48 bg-white border shadow-lg z-20 pt-3">
              <span className="text-sm font-semibold leading-6 text-gray-900 pl-4">
                {user?.name}
              </span>
              <button
                onClick={handleEnterProfilePage}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
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
        <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary focus:text-secondary active:text-white">
          Log in <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </>
  );
}

export default Avatar;
