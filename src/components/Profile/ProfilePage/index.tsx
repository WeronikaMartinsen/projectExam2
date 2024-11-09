import "../../../styles/index.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile, getVenuesByProfile } from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { Profile } from "../../../service/ApiCalls/Interfaces/profile";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";
import { useAuth } from "../../../context/useAuth";
import LoadingSkeleton from "../../Skeleton";
import { useNavigate } from "react-router-dom";
import VenueCard from "../../Venues/VenueCard";

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const { user, isLoggedIn } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]); // Updated type
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleVenueSelect = (id: string) => {
    navigate(`/venue/${id}`);
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  // const handleUpdateAvatar = (newUrl: string) => {
  //   // Update the profile avatar with the new URL
  //   // You would typically call an API to update this in your backend
  //   setProfile((prev) => ({
  //     ...prev,
  //     avatar: { ...prev.avatar, url: newUrl },
  //   }));
  // };

  const accessToken = user?.accessToken;
  const fetchProfileAndVenues = async () => {
    if (name && accessToken) {
      try {
        // Fetch profile data, including bookings
        const profileData = await getProfile(name, accessToken, true);
        setProfile(profileData.data);

        // Check if bookings are part of the returned data structure
        if (profileData.data.bookings) {
          setBookings(profileData.data.bookings); // Adjust if bookings are nested differently
        } else {
          console.warn("No bookings found in profile data.");
          setBookings([]); // Set to empty if no bookings found
        }

        // Fetch venues
        const venuesData = await getVenuesByProfile(name, accessToken);
        setVenues(venuesData.data || []);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
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
  }, [name, accessToken, isLoggedIn]); // React to isLoggedIn changes

  if (loading) return <LoadingSkeleton width="800px" height={40} />;
  if (error) return <div>Error: {error}</div>;

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">
          You must be logged in to see the profile.
        </p>
      </div>
    );
  }

  return (
    <div className="container w-full">
      <div className="flex flex-col justify-center items-center">
        {profile && (
          <div className="container max-w-7xl shadow-lg">
            {/* Banner as background image */}
            <div
              className="w-full h-48 bg-cover bg-center"
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
              <h1 className="text-2xl font-semibold mt-4">{profile.name}</h1>
              {profile.venueManager && (
                <h2 className="text-lg font-bold">Venue Manager</h2>
              )}
            </div>

            <div className="text-center mt-4">
              <span className="block text-gray-700">{profile.email}</span>
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            </div>
          </div>
        )}

        {/* Display Venues */}
        <div className="max-w-7xl w-full mt-6">
          <h3 className="text-md font-semibold ml-4">
            {profile?.name}'venues:
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
            )}{" "}
          </ul>
        </div>

        {/* Display Bookings */}
        <div className="grid gap-4 mt-8">
          <h1 className="text-pretty font-semibold">
            {profile?.name}'s Bookings:
          </h1>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-light rounded-lg shadow-sm hover:shadow-md transition-transform transform p-4"
              >
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg">
                    Booking ID: {booking.id}
                  </h3>
                  <p>{booking.created}</p>
                  <p className="text-sm text-gray-600">
                    Guests: {booking.guests}
                  </p>
                  <p className="text-sm text-gray-600">
                    From: {new Date(booking.dateFrom).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
                {booking.venue && (
                  <div className="flex flex-col justify-center items-end">
                    <h4 className="text-md mt-2">
                      Venue: {booking.venue.name}
                    </h4>
                    <Link
                      to={`/venue/${booking.venue.id}`}
                      className="block text-accent p-2 rounded-md text-sm mt-2"
                    >
                      View Venue
                    </Link>
                  </div>
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
