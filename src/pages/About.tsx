import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import AboutContent from "../components/About/AboutContent";

function About() {
  return (
    <>
      <LayoutComponent>
        <AboutContent />
      </LayoutComponent>
    </>
  );
}

export default About;
