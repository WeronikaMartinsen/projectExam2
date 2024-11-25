import React from "react";
import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import MyBookingsPage from "../components/Bookings/MyBookingPage";

function Bookings() {
  return (
    <>
      <Helmet>
        <title>My Bookings - View Your Reservations</title>
        <meta
          name="description"
          content="Check and manage your bookings for venues quickly and easily. View details of your reservations and upcoming plans."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <MyBookingsPage />
      </LayoutComponent>
    </>
  );
}

export default Bookings;
