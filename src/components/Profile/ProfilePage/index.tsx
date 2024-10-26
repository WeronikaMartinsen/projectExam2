import "../../../styles/index.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { Profile } from "../../../service/ApiCalls/Interfaces/profile";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";
import { useAuth } from "../../../context/useAuth";

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]); // Updated type
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
          // Ensure the profile fetch includes venue details for bookings
          const profileData = await getProfile(name, accessToken, true);
          setProfile(profileData.data);

          // Set venues and bookings if they exist within the profile data
          setVenues(profileData.data.venues || []);
          setBookings(profileData.data.bookings || []); // This should include venue details if available
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
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        {profile && (
          <div className="container max-w-8xl shadowp-4 rounded-lg shadow-lg">
            {/* Banner as background image */}
            <div
              className="w-full h-48 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage: `url(${profile.banner?.url || ""})`,
              }}
            ></div>

            {/* Avatar and Profile Info */}
            <div className="relative flex flex-col items-center -mt-16">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                src={profile.avatar?.url || "/default-avatar.png"}
                alt={profile.avatar?.alt || "Owner avatar"}
              />
              <h2 className="text-2xl font-semibold mt-4">{profile.name}</h2>
            </div>

            <div className="text-center mt-4">
              <span className="block text-gray-700">{profile.email}</span>
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            </div>
          </div>
        )}

        {/* Display Venues */}
        <div className="grid gap-4 mt-8">
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

        {/* Display Bookings */}

        <div className="grid gap-4 mt-8">
          <h1 className="text-pretty font-semibold">
            {profile?.name}'bookings:
          </h1>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-gray-200 rounded shadow">
                <h3 className="text-lg font-semibold">
                  Booking ID: {booking.id}
                </h3>
                <p>Guests: {booking.guests}</p>
                <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                {booking.venue && (
                  <Link
                    to={`/venue/${booking.venue.id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <div className="mt-2">
                      <h4 className="text-md font-semibold">
                        Venue: {booking.venue.name}
                      </h4>
                      <p>{booking.venue.description}</p>
                    </div>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div>No bookings found for this profile.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
