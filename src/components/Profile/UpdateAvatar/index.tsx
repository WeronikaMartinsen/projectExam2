// Avatar.tsx
import { MdEdit } from "react-icons/md";

interface AvatarProps {
  avatarUrl: string;
  onEditClick: () => void;
}

const UpdateAvatar: React.FC<AvatarProps> = ({ avatarUrl, onEditClick }) => {
  return (
    <div className="relative flex flex-col items-center -mt-16">
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        src={avatarUrl || "/default-avatar.png"}
        alt="Avatar"
      />
      <div
        className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200"
        title="Update profile picture"
        onClick={onEditClick}
      >
        <MdEdit className="inline-block text-xl" />
      </div>
    </div>
  );
};

export default UpdateAvatar;
