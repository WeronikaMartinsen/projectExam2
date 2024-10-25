import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import SingleVenueCard from "../components/Venues/SingleVenueCard";
import HeaderSingleVenue from "../components/Venues/HeaderSingleVenue";

function SingleVenues() {
  return (
    <>
      <LayoutComponent>
        <HeaderSingleVenue/>
        <SingleVenueCard />
      </LayoutComponent>
    </>
  );
}

export default SingleVenues;
