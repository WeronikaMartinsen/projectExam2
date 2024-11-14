import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import RegisterPage from "../components/AuthenticationPages/RegisterPage";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";


function Register() {
  return (
    <LayoutComponent>
    <GlobalSmallHeader />
      <RegisterPage />
    </LayoutComponent>
  );
}

export default Register;
