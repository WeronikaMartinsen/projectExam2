import "../../../styles/index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getVenuesByProfile } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { Profile } from "../../../service/ApiCalls/Interfaces/profile";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";
import { useAuth } from "../../../context/useAuth";
import LoadingSkeleton from "../../Skeleton";
import { useNavigate } from "react-router-dom";
import VenueCard from "../../Venues/VenueCard";
import BookingCard from "../../Bookings/BookingCard";

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const { user, isLoggedIn } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleVenueSelect = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const accessToken = user?.accessToken;

  const fetchProfileAndVenues = async () => {
    if (name && accessToken) {
      try {
        const profileData = await getProfile(name, accessToken, true);
        setProfile(profileData.data);

        if (profileData.data.bookings) {
          setBookings(profileData.data.bookings);
        } else {
          setBookings([]);
        }
        const venuesData = await getVenuesByProfile(name, accessToken);
        setVenues(venuesData.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch profile data"
        );
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProfileAndVenues();
    setLoading(false);
  }, [name, accessToken, isLoggedIn]);

  if (loading) return <LoadingSkeleton width="800px" height={40} />;
  if (error) return <div>Error: {error}</div>;

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4">
        <p className="text-danger">You must be logged in to see the profile.</p>
      </div>
    );
  }

  return (
    <div className="container w-full">
      <div className="flex flex-col justify-center items-center">
        {profile && (
          <div className="container max-w-7xl shadow-lg">
            <div
              className="w-full h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.banner?.url || ""})` }}
            ></div>

            <div className="relative flex flex-col items-center -mt-16">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                src={profile.avatar?.url || "/default-avatar.png"}
                alt={profile.avatar?.alt || "Owner avatar"}
              />
              <h1 className="text-2xl font-semibold mt-4">{profile.name}</h1>
              {profile.venueManager && (
                <h2 className="text-md">Venue Manager</h2>
              )}
            </div>

            <div className="text-center mt-4 mb-2">
              <span className="block text-sm text-gray-700">
                {profile.email}
              </span>
              <p className="mt-2 text-sm text-gray-600">{profile.bio}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="max-w-7xl w-full mt-6">
            <h3 className="text-md ml-4 w-full bg-primary p-3 text-white rounded">
              Venues
            </h3>
            <ul className="space-y-8 mt-4">
              {venues.length > 0 ? (
                venues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onClick={() => handleVenueSelect(venue.id)}
                  />
                ))
              ) : (
                <div>No venues found for this profile.</div>
              )}
            </ul>
          </div>

          <div className="grid gap-4 mt-6">
            <h3 className="w-full bg-primary text-white rounded p-3 h-12">
              Bookings
            </h3>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div>No bookings found for this profile.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
