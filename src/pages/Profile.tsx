import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import ProfilePage from "../components/Profile/ProfilePage";
import HeaderSingleVenue from "../components/Venues/HeaderSingleVenue";

function Profile() {
  return (
    <>
      <LayoutComponent>
        <HeaderSingleVenue />
        <ProfilePage />
      </LayoutComponent>
    </>
  );
}

export default Profile;
