import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import SingleVenueCard from "../components/Venues/SingleVenueCard";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function SingleVenues() {
  return (
    <>
      <LayoutComponent>
        <GlobalSmallHeader />
        <SingleVenueCard />
      </LayoutComponent>
    </>
  );
}

export default SingleVenues;
