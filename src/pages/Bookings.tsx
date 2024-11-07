import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import BookingByProfile from "../components/Bookings/BookingsByProfile";

function Bookings() {
  return (
    <>
      <LayoutComponent>
        <GlobalSmallHeader />
        <BookingByProfile />
      </LayoutComponent>
    </>
  );
}

export default Bookings;
