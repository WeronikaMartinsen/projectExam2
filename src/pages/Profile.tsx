import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import ProfilePage from "../components/Profile/ProfilePage";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function Profile() {
  return (
    <>
      <Helmet>
        <title>Your Profile</title>
        <meta
          name="description"
          content="View and update your profile details, manage bookings, and customize your preferences."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <ProfilePage />
      </LayoutComponent>
    </>
  );
}

export default Profile;
