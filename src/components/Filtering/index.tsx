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
    <div className="p-2 max-w-5xl w-full mx-auto">
      <h2 className="text-md text-gray-700 mb-4">Filter Options</h2>
      <div className="flex flex-wrap justify-around">
        {[
          { name: "wifi", label: "Wi-Fi" },
          { name: "breakfast", label: "Breakfast" },
          { name: "parking", label: "Parking" },
          { name: "pets", label: "Pets" },
        ].map(({ name, label }) => (
          <label
            key={name}
            className="flex items-center justify-around gap-2 px-4 py-2 bg-gray-50 rounded hover:bg-gray-200 transition cursor-pointer"
          >
            <span className="text-gray-800">{label}</span>
            <input
              type="checkbox"
              name={name}
              checked={filters[name as keyof Filters]}
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filtering;
