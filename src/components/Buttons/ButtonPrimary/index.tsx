import "../../../styles/index.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Optional, defaults to 'button'
  onClick?: () => void; // Optional, defaults to no action
  className?: string; // Optional additional styling
  children: React.ReactNode; // To accept inner text or elements
  disabled?: boolean; // Optional for disabled state
}

const ButtonPrimary: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-3 pl-6 pr-6 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
