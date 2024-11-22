import { Link } from "react-router-dom";
import "../../../styles/index.css";

function GlobalSmallHeader() {
  return (
    <>
      <section className="bg-secondary h-21 w-full">
        <div className="flex justify-center align-middle items-center">
          <span className="text-white bg-black font-semibold text-center text-xs p-2 rounded">
            BLACK WEEK STARTS! Up til 50% rabat!
          </span>
          <Link
            className="text-accent text-center text-xs font-semibold leading-6 p-4 cursor-pointer"
            to="/"
          >
            Check for more offers &#8594;
          </Link>
        </div>
      </section>
    </>
  );
}
export default GlobalSmallHeader;
