// ProfilePictureModal.tsx
import React, { useState } from "react";

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

const AvatarUpdateModal: React.FC<ProfilePictureModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (newAvatar) {
      onSubmit(newAvatar);
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto"
        role="dialog"
        aria-labelledby="modal-label"
        tabIndex={-1}
        onClick={(e) => e.currentTarget === e.target && onClose()}
      >
        <div className="max-w-lg w-full mx-auto">
          <div className="bg-white border shadow-sm rounded">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="modal-label" className="font-bold">
                Update Profile Picture
              </h3>
              <button
                type="button"
                className="inline-flex justify-center items-center rounded-full p-2 hover:bg-gray-200 focus:outline-none"
                aria-label="Close"
                onClick={onClose}
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
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="mb-4"
              />
              <button
                className="w-full bg-primary text-white py-2 rounded"
                onClick={handleSubmit}
              >
                Update Profile Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AvatarUpdateModal;
