import React, { useState } from "react";

interface Filters {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
}

interface FilterSidebarProps {
  filters: Filters; // Use the Filters interface
  onFilterChange: (newFilters: Filters) => void; // Update the type here
}

const Sidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFilterChange({ ...filters, [name]: checked });
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"} md:sticky md:top-0`}>
      <button
        className="sm:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Close" : "Filters"}
      </button>
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="flex flex-col mt-6 gap-4">
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="wifi"
            checked={filters.wifi}
            onChange={handleCheckboxChange}
          />
          Wi-Fi
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="breakfast"
            checked={filters.breakfast}
            onChange={handleCheckboxChange}
          />
          Breakfast
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="pets"
            checked={filters.pets}
            onChange={handleCheckboxChange}
          />
          Pets
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
