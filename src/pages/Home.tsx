import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import VenuesList from "../components/Venues/VenuesList";

function Home() {
  return (
    <>
      <Helmet>
        <title>Explore Top Venues</title>
        <meta
          name="description"
          content="Discover and book the best venues for events and gatherings."
        />
      </Helmet>
      <LayoutComponent>
        <VenuesList />
      </LayoutComponent>
    </>
  );
}

export default Home;
