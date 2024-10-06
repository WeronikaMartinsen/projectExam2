import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import FilterHomePage from "../components/Search/FilterHomePage";

function Home() {
  return (
    <>
      <LayoutComponent>
        <FilterHomePage />
      </LayoutComponent>
    </>
  );
}

export default Home;
