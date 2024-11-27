import { Link } from "react-router-dom";
import "../../../styles/index.css";

function GlobalSmallHeader() {
  return (
    <section className="bg-secondary h-16 sm:h-20 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-8 sm:py-4">
        {/* Banner Text */}
        <span className="text-white bg-black font-semibold text-xs sm:text-sm p-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center">
          BLACK WEEK STARTS! Up to 50% OFF!
        </span>

        {/* CTA Link */}
        <Link
          className="text-accent text-center text-xs sm:text-sm font-semibold leading-6 p-2 sm:p-4 cursor-pointer hover:underline"
          to="/"
        >
          Check for more offers &#8594;
        </Link>
      </div>
    </section>
  );
}

export default GlobalSmallHeader;
