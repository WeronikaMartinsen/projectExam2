import React from "react";
import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import AboutContent from "../components/About/AboutContent";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Learn More</title>
        <meta
          name="description"
          content="Learn more about our mission, values, and what we offer to help you discover and book amazing venues."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <AboutContent />
      </LayoutComponent>
    </>
  );
}

export default About;
