import React from "react";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import VenuesList from "../components/Venues/VenuesList";

function Home() {
  return (
    <LayoutComponent>
      <VenuesList />
    </LayoutComponent>
  );
}

export default Home;
