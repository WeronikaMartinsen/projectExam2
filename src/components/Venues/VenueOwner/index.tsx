import { Link } from "react-router-dom";
import { Owner } from "../../../service/ApiCalls/Interfaces/venue";

interface VenueOwnerProps {
  owner?: Owner;
}

function VenueOwner({ owner }: VenueOwnerProps) {
  if (!owner) return null; // If no owner, don't render

  return (
    <section className="relative h-16 w-full max-w-sm rounded overflow-hidden">
      {/* Avatar and Owner Info Overlay */}
      <div className="absolute left-3 flex items-center bg-white bg-opacity-80 rounded-full p-1 mt-1 shadow-md">
        <Link to={`/profiles/${owner.name}`}>
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
            src={owner.avatar.url || "/default-avatar.png"}
            alt={owner.avatar.alt || "Owner avatar"}
          />
        </Link>
        <h1 className="ml-2 text-sm font-semibold leading-5 text-gray-800">
          {owner.name}
        </h1>
      </div>
    </section>
  );
}

export default VenueOwner;
