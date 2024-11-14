import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Profile,
  UpdatedProfileData,
} from "../../../service/ApiCalls/Interfaces/profile";

// Validation schema
const schema = yup
  .object({
    bio: yup
      .string()
      .max(160, "Bio must be less than 160 characters.")
      .nullable(),
    venueManager: yup.boolean(),
    avatar: yup.object().shape({
      url: yup.string().url("Please enter a valid URL for avatar.").nullable(),
      alt: yup
        .string()
        .max(120, "Alt text must be less than 120 characters.")
        .nullable(),
    }),
    banner: yup.object().shape({
      url: yup.string().url("Please enter a valid URL for banner.").nullable(),
      alt: yup
        .string()
        .max(120, "Alt text must be less than 120 characters.")
        .nullable(),
    }),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: UpdatedProfileData) => void;
  profile: Profile | null; // Accept profile data as a prop
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  profile,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio || "",
        venueManager: profile.venueManager || undefined,
        avatar: profile.avatar || undefined,
        banner: profile.avatar || undefined,
      });
    }
  }, [profile, reset]);

  const onSubmitHandler = (data: FormData) => {
    const updatedData: UpdatedProfileData = {
      bio: data.bio || undefined, // Convert null to undefined
      avatar: data.avatar?.url
        ? { url: data.avatar.url, alt: data.avatar.alt || "" }
        : undefined,
      banner: data.banner?.url
        ? { url: data.banner.url, alt: data.banner.alt || "" }
        : undefined,
      venueManager: data.venueManager,
    };

    onSubmit(updatedData); // Pass the updated profile data
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
                Update Profile
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
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {/* Bio Field */}
                <div className="w-full flex flex-col mb-4">
                  <textarea
                    {...register("bio")}
                    className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.bio?.message}
                  </p>
                </div>

                {/* Avatar URL Field */}
                <div className="w-full flex flex-col mb-4">
                  <input
                    {...register("avatar.url")}
                    className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
                    type="url"
                    placeholder="Avatar URL"
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.avatar?.url?.message}
                  </p>
                </div>

                {/* Banner URL Field */}
                <div className="w-full flex flex-col mb-4">
                  <input
                    {...register("banner.url")}
                    className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
                    type="url"
                    placeholder="Banner URL"
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.banner?.url?.message}
                  </p>
                </div>

                {/* Venue Manager Checkbox */}
                <div className="mb-4">
                  <label className="flex items-center text-sm font-semibold mb-2">
                    <input
                      type="checkbox"
                      {...register("venueManager")}
                      className="mr-2"
                    />
                    Venue Manager
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded mt-4"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileUpdateModal;
