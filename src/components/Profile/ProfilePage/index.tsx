import "../../../styles/index.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        if (name) {
          const profileData = await getProfile(name);
          setVenues(profileData);
          console.log(profileData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch venues data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}'s Venues</h1>
      <div className="grid gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p>{venue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
