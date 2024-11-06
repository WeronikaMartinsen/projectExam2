import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import AboutContent from "../components/About/AboutContent";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function About() {
  return (
    <>
      <LayoutComponent>
      <GlobalSmallHeader />
        <AboutContent />
      </LayoutComponent>
    </>
  );
}

export default About;
