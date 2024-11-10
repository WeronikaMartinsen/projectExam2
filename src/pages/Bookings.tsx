import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import MyBookingsPage from "../components/Bookings/MyBookingPage";

function Bookings() {
  return (
    <>
      <LayoutComponent>
        <GlobalSmallHeader />
        <MyBookingsPage />
      </LayoutComponent>
    </>
  );
}

export default Bookings;
