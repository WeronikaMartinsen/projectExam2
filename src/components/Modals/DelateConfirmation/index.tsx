import React from "react";

interface DeleteConfirmationModalProps {
  open: boolean;
  venueId: string;
  handleClose: () => void;
  handleDelete: (venueId: string) => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationModalProps> = ({
  open,
  venueId,
  handleClose,
  handleDelete,
}) => {
  const confirmDelete = () => {
    handleDelete(venueId);
    handleClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto"
          role="dialog"
          aria-labelledby="modal-label"
          tabIndex={-1}
        >
          <div className="max-w-lg w-full mx-auto">
            <div className="bg-white border shadow-sm rounded">
              {/* Modal Header */}
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 id="modal-label" className="font-bold">
                  Confirm Deletion
                </h3>
                <button
                  type="button"
                  className="inline-flex justify-center items-center rounded-full p-2 hover:bg-gray-200 focus:outline-none"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <p>Are you sure you want to delete this venue?</p>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center py-3 px-4 border-t">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmation;
