import React from "react";

interface Filters {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}

const Filtering: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFilterChange({ ...filters, [name]: checked });
  };

  return (
    <div className="flex">
      {/* Filtering Drawer */}
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center align-middle">
          {/* Filter options */}
          <label className="flex items-center gap-2 sm:gap-4 sm:p-3 transition duration-200 text-sm">
            <input
              type="checkbox"
              name="wifi"
              checked={filters.wifi}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-blue-600"
            />
            Wi-Fi
          </label>
          <label className="flex items-center gap-2 sm:gap-4 sm:p-3 transition duration-200 text-sm">
            <input
              type="checkbox"
              name="breakfast"
              checked={filters.breakfast}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-blue-600"
            />
            Breakfast
          </label>
          <label className="flex items-center gap-2 sm:gap-4 sm:p-3 transition duration-200 text-sm">
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-blue-600"
            />
            Parking
          </label>
          <label className="flex items-center gap-2 sm:gap-4 sm:p-3 transition duration-200 text-sm">
            <input
              type="checkbox"
              name="pets"
              checked={filters.pets}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-blue-600"
            />
            Pets
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
