import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import ProfilePage from "../components/Profile/ProfilePage";

function Profile() {
  return (
    <>
      <LayoutComponent>
        <ProfilePage />
      </LayoutComponent>
    </>
  );
}

export default Profile;
