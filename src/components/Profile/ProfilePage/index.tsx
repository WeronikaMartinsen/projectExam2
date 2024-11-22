import "../../../styles/index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProfile,
  getVenuesByProfile,
  updateProfile,
} from "../../../service/apiRequests";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import {
  Profile,
  UpdatedProfileData,
} from "../../../service/ApiCalls/Interfaces/profile";
import { BookingWithDetails } from "../../../service/ApiCalls/Interfaces/bookings";
import { useAuth } from "../../../context/useAuth";
import LoadingSkeleton from "../../Skeleton";
import VenueCard from "../../Venues/VenueCard";
import BookingCard from "../../Bookings/BookingCard";
import MessageWithRedirect from "../../UserMessages/MessageWithRedirect";
import { MdEdit } from "react-icons/md";
import ProfileUpdateModal from "../../Modals/ProfileUpdateModal";
import { useAuthStore } from "../../../service/Store/authStore";

// Helper function to calculate the number of days until travel
const daysUntilTravel = (travelDate: string) => {
  const travelDateObj = new Date(travelDate);
  const currentDate = new Date();
  const timeDiff = travelDateObj.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days
  return daysLeft;
};

function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const { user, isLoggedIn } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVenues, setShowVenues] = useState(true);
  const updateUserInStore = useAuthStore((state) => state.updateUser);

  const accessToken = user?.accessToken;

  const fetchProfileAndVenues = async () => {
    if (name && accessToken) {
      try {
        const profileData = await getProfile(name, accessToken, true);
        setProfile(profileData.data);
        setBookings(profileData.data.bookings || []);
        const venuesData = await getVenuesByProfile(name, accessToken);
        setVenues(venuesData.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = async (updatedData: UpdatedProfileData) => {
    if (!accessToken || !name) {
      console.error("No access token or profile name available");
      return;
    }

    try {
      const updatedProfileData: Profile = {
        ...profile!,
        ...updatedData,
      };

      if (updatedProfileData.avatar === null) {
        updatedProfileData.avatar = undefined;
      }
      if (updatedProfileData.banner === null) {
        updatedProfileData.banner = undefined; // Reset to undefined
      }
      if (updatedProfileData.bio === null) {
        updatedProfileData.bio = undefined; // Reset to undefined
      }
      if (updatedProfileData.venueManager === null) {
        updatedProfileData.venueManager = undefined; // Reset to undefined
      }

      setProfile(updatedProfileData);
      // Update store user
      updateUserInStore({
        name: updatedProfileData.name,
        bio: updatedProfileData.bio ?? "",
        avatar: updatedProfileData.avatar,
        venueManager: updatedProfileData.venueManager,
      });

      await updateProfile(name, updatedProfileData, accessToken);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsModalOpen(false); // Close the modal after update
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetchProfileAndVenues();
    }
  }, [name, accessToken, isLoggedIn]);

  if (loading) {
    return (
      <div className="container w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="container max-w-7xl shadow-lg">
            {/* Banner Skeleton */}
            <LoadingSkeleton width="100%" height={192} />

            <div className="relative flex flex-col items-center -mt-16">
              {/* Avatar Skeleton */}
              <LoadingSkeleton width={128} height={128} />

              {/* Name Skeleton */}
              <LoadingSkeleton width={200} height={30} />

              {/* Venue Manager Label Skeleton */}
              <LoadingSkeleton width={150} height={20} />
            </div>

            <div className="text-center mt-4 mb-2">
              {/* Email Skeleton */}
              <LoadingSkeleton width={300} height={20} />

              {/* Bio Skeleton */}
              <LoadingSkeleton width={400} height={60} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center">
            {/* Venues Section Skeleton */}
            <div className="max-w-9xl w-full mt-6">
              <LoadingSkeleton width="100%" height={48} />
              <div className="space-y-4 mt-4">
                {/* Venue Card Skeletons */}
                <LoadingSkeleton width="100%" height={100} />
                <LoadingSkeleton width="100%" height={100} />
                <LoadingSkeleton width="100%" height={100} />
              </div>
            </div>

            {/* Bookings Section Skeleton */}
            <div className="max-w-5xl w-full mt-6">
              <LoadingSkeleton width="100%" height={48} />
              <div className="space-y-4 mt-4">
                {/* Booking Card Skeletons */}
                <LoadingSkeleton width="100%" height={100} />
                <LoadingSkeleton width="100%" height={100} />
                <LoadingSkeleton width="100%" height={100} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4">
        <p className="text-danger">You must be logged in to see the profile.</p>
      </div>
    );
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );
  const upcomingBookings = sortedBookings.filter(
    (booking) => new Date(booking.dateFrom) >= new Date()
  );
  const pastBookings = sortedBookings.filter(
    (booking) => new Date(booking.dateFrom) < new Date()
  );

  return (
    <div className="container w-full">
      <div className="flex flex-col justify-center items-center">
        {profile && (
          <div className="container max-w-7xl shadow-lg">
            <div
              className="w-full h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.banner?.url || ""})` }}
            />
            <div className="relative flex flex-col items-center -mt-16">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                src={profile.avatar?.url || "/default-avatar.png"}
                alt={profile.avatar?.alt || "Owner avatar"}
              />
              {profile.name === user?.name && (
                <div className="ml-auto mr-2">
                  <button
                    className="p-2 border-gray shadow text-sm border rounded flex justify-center gap-2 items-center hover:shadow-md"
                    onClick={handleOpenModal}
                  >
                    Update Profile
                    <MdEdit />
                  </button>
                  <ProfileUpdateModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleProfileUpdate}
                    profile={profile}
                  />
                </div>
              )}

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

        <div className="flex justify-center items-center mt-6">
          {/* Toggle Button */}
          <button
            className={`p-2 mx-2 ${
              showVenues ? "bg-primary" : "bg-secondary"
            } text-white rounded`}
            onClick={() => setShowVenues(true)}
          >
            Venues
          </button>
          <button
            className={`p-2 mx-2 ${
              !showVenues ? "bg-primary" : "bg-secondary"
            } text-white rounded`}
            onClick={() => setShowVenues(false)}
          >
            Bookings
          </button>
        </div>

        <div className="max-w-5xl w-full flex justify-center items-center">
          {/* Conditional Rendering based on Toggle */}
          {showVenues ? (
            <div className="max-w-9xl w-full mt-6">
              <h3 className="text-md text-center w-full bg-primary p-3 text-white rounded">
                Venues
              </h3>
              <ul className="space-y-8 mt-4">
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))
                ) : (
                  <MessageWithRedirect
                    message="You don't have any venue yet. Create it now!"
                    redirectTo="/venues"
                    buttonText="Add venue"
                    autoRedirect={false}
                  />
                )}
              </ul>
            </div>
          ) : (
            <div className="max-w-5xl w-full mt-6">
              <h3 className="w-full bg-primary text-white text-center rounded p-3 h-12">
                Bookings
              </h3>
              {upcomingBookings.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isPastBooking={false}
                      daysLeft={daysUntilTravel(booking.dateFrom)}
                    />
                  ))}
                </div>
              )}
              {pastBookings.length > 0 && (
                <div className="mt-8 flex flex-col gap-2">
                  <span className="text-lg text-gray-700 mt-4">
                    Last Travel
                  </span>
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isPastBooking={true}
                    />
                  ))}
                </div>
              )}
              {bookings.length === 0 && (
                <MessageWithRedirect
                  message="You don't have any bookings yet. Book now!"
                  redirectTo="/"
                  buttonText="Find venue"
                  autoRedirect={false}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
