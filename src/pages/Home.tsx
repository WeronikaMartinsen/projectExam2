import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import FilterHomePage from "../components/Search/FilterHomePage";
import VenuesList from "../components/Venues/VenuesList";

function Home() {
  return (
    <>
      <LayoutComponent>
        <FilterHomePage />
        <VenuesList />
      </LayoutComponent>
    </>
  );
}

export default Home;
