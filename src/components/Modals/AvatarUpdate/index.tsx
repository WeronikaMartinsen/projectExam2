import React, { useState } from "react";

interface AvatarUpdateModalProps {
  open: boolean;
  handleOpen: () => void;
  onUpdate: (newUrl: string) => void; // Callback to handle URL update
}

const AvatarUpdateModal: React.FC<AvatarUpdateModalProps> = ({
  open,
  handleOpen,
  onUpdate,
}) => {
  const [newUrl, setNewUrl] = useState("");

  const handleUpdate = () => {
    if (newUrl) {
      onUpdate(newUrl);
      setNewUrl(""); // Clear the input after update
      handleOpen(); // Close the modal
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleOpen();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="max-w-lg w-full mx-auto">
            <div className="bg-white border shadow-sm rounded">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold">Update Avatar</h3>
                <button
                  type="button"
                  className="inline-flex justify-center items-center rounded p-2 hover:bg-gray-200"
                  onClick={handleOpen}
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
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Enter new avatar URL"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-center py-3">
                <button
                  className="bg-accent text-primary p-2 rounded"
                  onClick={handleUpdate}
                >
                  Update Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarUpdateModal;
