import "../../../styles/index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { Profile } from "../../../service/ApiCalls/Interfaces/profile";
import { useAuth } from "../../../context/useAuth";

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const accessToken = user?.accessToken;

  useEffect(() => {
    const fetchProfileAndVenues = async () => {
      try {
        setLoading(true);
        if (name && accessToken) {
          const profileData = await getProfile(name, accessToken);
          setProfile(profileData.data);

          // Set venues if they exist within the profile data
          setVenues(profileData.data.venues || []);
          console.log(profileData);
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndVenues();
  }, [name, accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {profile && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold bg-primary h-full">
            {profile.name}
          </h2>
          <p>{profile.bio}</p>
        </div>
      )}
      <div className="grid gap-4">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-semibold">{venue.name}</h2>
              <p>{venue.description}</p>
            </div>
          ))
        ) : (
          <div>No venues found for this profile.</div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
