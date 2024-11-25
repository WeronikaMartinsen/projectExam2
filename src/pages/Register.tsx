import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import RegisterPage from "../components/AuthenticationPages/RegisterPage";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";

function Register() {
  return (
    <>
      <Helmet>
        <title>Sign Up for an Account</title>
        <meta
          name="description"
          content="Create a new account to start booking venues, managing reservations, and exploring top event locations."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <RegisterPage />
      </LayoutComponent>
    </>
  );
}

export default Register;
