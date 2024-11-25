import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function UpdateVenue() {
  return (
    <>
      <Helmet>
        <title>Update Venue</title>
        <meta
          name="description"
          content="Update the details of your venue including name, description, pricing, and amenities."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <CreateVenueForm />
      </LayoutComponent>
    </>
  );
}

export default UpdateVenue;
