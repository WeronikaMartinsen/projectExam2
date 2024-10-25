import "../../../styles/index.css";
import { Owner } from "../../../service/ApiCalls/Interfaces/venue";

interface VenueOwnerProps {
  owner?: Owner;
}

function VenueOwner({ owner }: VenueOwnerProps) {
  if (!owner) return null; // If no owner, don't render

  return (
    <section
      className="bg-secondary h-21 w-1/2 bg-cover bg-center"
      style={{
        backgroundImage: `url(${owner.banner.url})`,
      }}
    >
      <div className="flex justify-start bg-opacity-70 mt-6">
        <img
          className="flex w-10 h-10 rounded-full border shadow"
          src={owner.avatar.url}
          alt={owner.avatar.alt || "Owner avatar"}
        />
        <h1 className="text-center text-sm font-semibold leading-6 p-4">
          {owner.name}
        </h1>
      </div>
    </section>
  );
}

export default VenueOwner;
