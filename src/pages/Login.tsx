import LayoutComponent from "../layout/LayoutComponent";
import "../styles/index.css";
import GlobalSmallHeader from "../components/Venues/GlobalSmallHeader";
import LoginPage from "../components/AuthenticationPages/LoginPage";

function Login() {
  return (
    <LayoutComponent>
      <GlobalSmallHeader />
      <LoginPage />
    </LayoutComponent>
  );
}

export default Login;
