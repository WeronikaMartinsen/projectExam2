import React from "react";
import LoginForm from "../../Forms/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="mt-8">
        <LoginForm />
        <div className="text-center mt-4">
          <p>Don't have an account yet?</p>
          <Link to="/register" className="text-secondary">
            Register
          </Link>
        </div>
      </div>
  );
};

export default LoginPage;
