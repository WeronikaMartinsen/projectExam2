import React, { useState } from "react";

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

const Sidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFilterChange({ ...filters, [name]: checked });
  };

  return (
    <>
      {/* Button to show the drawer; hidden when the drawer is open */}
      {!isOpen && (
        <div className="flex justify-start m-0 p-0text-center">
          <button
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Filters
          </button>
        </div>
      )}

      {/* Drawer component */}
      <div
        className={`rounded-lg shadow fixed top-100 left-0 z-40 h-100 p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-40`}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-4 font-semibold text-gray-500 dark:text-gray-400"
        >
          Filters
        </h5>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="flex flex-col mt-6 gap-4">
          <label className="text-sm leading-6">
            <input
              className="mr-2"
              type="checkbox"
              name="wifi"
              checked={filters.wifi}
              onChange={handleCheckboxChange}
            />
            Wi-Fi
          </label>
          <label className="text-sm leading-6">
            <input
              className="mr-2"
              type="checkbox"
              name="breakfast"
              checked={filters.breakfast}
              onChange={handleCheckboxChange}
            />
            Breakfast
          </label>
          <label className="text-sm leading-6">
            <input
              className="mr-2"
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleCheckboxChange}
            />
            Parking
          </label>
          <label className="text-sm leading-6">
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
    </>
  );
};

export default Sidebar;
