import { Helmet } from "react-helmet";
import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import LoginPage from "../components/AuthenticationPages/LoginPage";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login to Your Account</title>
        <meta
          name="description"
          content="Access your account to manage bookings, venues, and more. Secure and easy login."
        />
      </Helmet>
      <LayoutComponent>
        <GlobalSmallHeader />
        <LoginPage />
      </LayoutComponent>
    </>
  );
}

export default Login;
