import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import ProfilePage from "../components/Profile/ProfilePage";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function Profile() {
  return (
    <>
      <LayoutComponent>
        <GlobalSmallHeader />
        <ProfilePage />
      </LayoutComponent>
    </>
  );
}

export default Profile;
