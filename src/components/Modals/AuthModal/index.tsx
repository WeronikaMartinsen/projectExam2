// import React, { useState } from "react";
// import LoginForm from "../../Forms/LoginForm";
// import RegisterForm from "../../Forms/RegisterForm";

// interface ModalDialogProps {
//   open: boolean;
//   handleOpen: () => void; // This toggles the modal
// }

// const AuthModal: React.FC<ModalDialogProps> = ({ open, handleOpen }) => {
//   const [isRegister, setIsRegister] = useState(false); // State to track if the register form should be shown

//   // Close the modal and switch forms
//   const closeModal = () => {
//     handleOpen(); // This will toggle the modal visibility
//   };

//   // Close modal on outside click
//   const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget === e.target) {
//       closeModal();
//     }
//   };

//   return (
//     <>
//       {open && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto"
//           role="dialog"
//           aria-labelledby="modal-label"
//           tabIndex={-1}
//           onClick={handleOutsideClick} // Handle outside click
//         >
//           <div className="max-w-lg w-full mx-auto">
//             <div className="bg-white border shadow-sm rounded">
//               {/* Modal Header */}
//               <div className="flex justify-between items-center py-3 px-4 border-b">
//                 <h3 id="modal-label" className="font-bold">
//                   {isRegister ? "Register" : "Login"}
//                 </h3>
//                 <button
//                   type="button"
//                   className="inline-flex justify-center items-center rounded-full p-2 hover:bg-gray-200 focus:outline-none"
//                   aria-label="Close"
//                   onClick={closeModal}
//                 >
//                   <span className="sr-only">Close</span>
//                   <svg
//                     className="h-6 w-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="p-4 overflow-y-auto">
//                 {isRegister ? (
//                   <RegisterForm switchToLogin={() => setIsRegister(false)} />
//                 ) : (
//                   <LoginForm handleOpen={closeModal} />
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-center items-center gap-x-2 py-3 px-4">
//                 <p>
//                   {isRegister
//                     ? "Already have an account?"
//                     : "Don't have an account yet?"}
//                 </p>
//                 <span
//                   className="cursor-pointer text-secondary"
//                   onClick={() => setIsRegister(!isRegister)} // Toggle form
//                 >
//                   {isRegister ? "Login" : "Register"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AuthModal;
