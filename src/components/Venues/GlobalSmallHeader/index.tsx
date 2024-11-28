import { Link } from "react-router-dom";
import "../../../styles/index.css";

function GlobalSmallHeader() {
  return (
    <section className="bg-gradient-to-r from-primary via-secondary to-accent h-21 sm:h-20 w-full flex justify-center">
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-2 sm:px-8 sm:py-4 max-w-5xl w-full">
        {/* Logo or App Name */}
        <div className="text-white font-bold text-lg sm:text-xl">
          <Link to="/" className="hover:text-gray-200">
            Black Week
          </Link>
        </div>

        {/* New CTA with Icon */}
        <Link
          to="/"
          className="text-white text-xs sm:text-sm font-semibold p-2 sm:p-4 flex items-center space-x-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg cursor-pointer transition duration-300 ease-in-out"
        >
          <span>Check Our Latest Deals</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default GlobalSmallHeader;
