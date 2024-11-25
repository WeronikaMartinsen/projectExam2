import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import SingleVenueCard from "../components/Venues/SingleVenueCard";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function SingleVenues() {
  return (
    <>
      <Helmet>
        <title>Discover Venue Details</title>
        <meta
          name="description"
          content="View detailed information about your selected venue, including amenities, pricing, location, and availability."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <SingleVenueCard />
      </LayoutComponent>
    </>
  );
}

export default SingleVenues;
