import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function UpdateVenue() {
  return (
    <LayoutComponent>
      <GlobalSmallHeader />
      <CreateVenueForm />
    </LayoutComponent>
  );
}

export default UpdateVenue;
