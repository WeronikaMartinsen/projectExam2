import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import CreateVenueForm from "../components/Forms/CreateVenueForm";

function CreateVenue() {
  return (
    <LayoutComponent>
      <CreateVenueForm />
    </LayoutComponent>
  );
}

export default CreateVenue;
