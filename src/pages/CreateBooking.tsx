import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import CreateBookingForm from "../components/Forms/CreateBookingForm";

function CreateBooking() {
  return (
    <LayoutComponent>
      <GlobalSmallHeader />
      <CreateBookingForm />
    </LayoutComponent>
  );
}

export default CreateBooking;
