import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import HeroSection from "../components/Profile/HeroSection";
import SingleVenueCard from "../components/Venues/SingleVenueCard";

function SingleVenues() {
  return (
    <>
      <LayoutComponent>
        <HeroSection />
        <SingleVenueCard />
      </LayoutComponent>
    </>
  );
}

export default SingleVenues;
