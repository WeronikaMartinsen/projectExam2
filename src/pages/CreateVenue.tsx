import React from "react";
import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function CreateVenue() {
  return (
    <>
      <Helmet>
        <title>Create Venue - Add Your Property</title>
        <meta
          name="description"
          content="Easily create a venue listing to attract potential guests. Add details about your property, pricing, and amenities."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <CreateVenueForm />
      </LayoutComponent>
    </>
  );
}

export default CreateVenue;
