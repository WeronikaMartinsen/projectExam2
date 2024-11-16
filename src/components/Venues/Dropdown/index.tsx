import { forwardRef } from "react";

interface DropdownProps {
  isOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, onEdit, onDelete }, ref) => (
    <div ref={ref} className={`dropdown ${isOpen ? "open" : ""}`}>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
