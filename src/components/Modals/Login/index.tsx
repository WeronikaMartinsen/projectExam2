import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import LoginForm from "../../Forms/LoginForm";

interface ModalDialogProps {
  open: boolean;
  handleOpen: () => void;
}

const Login: React.FC<ModalDialogProps> = ({ open, handleOpen }) => {
  return (
    <>
      {open && (
        <div
          id="hs-scale-animation-modal"
          className="hs-overlay fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto pointer-events-auto"
          role="dialog"
          aria-labelledby="hs-scale-animation-modal-label"
          tabIndex={-1}
        >
          <div className="hs-overlay-animation-target opacity-100 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              {/* Modal Header */}
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3
                  id="hs-scale-animation-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Login
                </h3>

                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  onClick={handleOpen}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto">
                <LoginForm />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center gap-x-2 py-3 px-4 mt-4 dark:border-neutral-700">
                <Link to="/">
                  <ButtonPrimary
                    type="button"
                    onClick={handleOpen}
                    className="w-full border border-secondary"
                  >
                    Register
                  </ButtonPrimary>
                </Link>
                <Link to="/">
                  <ButtonPrimary
                    type="button"
                    onClick={handleOpen}
                    className="text-white w-full bg-secondary"
                  >
                    Login
                  </ButtonPrimary>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
