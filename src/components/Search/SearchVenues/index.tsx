import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";

interface SearchVenuesProps {
  onSearch: (query: string) => void;
  filteredVenues: Venue[];
  onVenueSelect: (id: string) => void;
}

const SearchVenues: React.FC<SearchVenuesProps> = ({
  onSearch,
  filteredVenues,
  onVenueSelect,
}) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
    setDropdownOpen(true); // Open dropdown on change
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
    setDropdownOpen(false); // Close dropdown on search submit
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <section className="bg-secondary h-21 w-full flex justify-center align-middle items-center">
      <div className="max-w-7xl w-full">
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-4 p-4 w-full"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search by name, ID, or localization"
            className="border rounded p-2 w-full mt-2 mb-2 text-xs"
          />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">
            Search
          </button>
        </form>
        {isDropdownOpen && query && filteredVenues.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute z-50 mt-1 bg-white border border-gray-300 shadow-lg rounded-md"
          >
            {filteredVenues.map((venue) => (
              <li
                key={venue.id}
                onClick={() => onVenueSelect(venue.id)}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span className="font-medium">{venue.name}</span>
                <span className="text-sm text-gray-500">
                  {venue.location.city}, {venue.location.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchVenues;
