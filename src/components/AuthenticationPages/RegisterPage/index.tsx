import React from "react";
import RegisterForm from "../../Forms/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <div className="mt-8">
        <RegisterForm />
        
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-secondary">
            Login
          </Link>
        </div>

    </div>
  );
};

export default RegisterPage;
