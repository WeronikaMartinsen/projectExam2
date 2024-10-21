import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import HeroSection from "../components/Profile/HeroSection";

function Profile() {
  return (
    <>
      <LayoutComponent>
        <HeroSection />
      </LayoutComponent>
    </>
  );
}

export default Profile;
