import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { FiSearch } from "react-icons/fi";

interface SearchVenuesProps {
  onSearch: (query: string) => void;
  venues: Venue[];
  onVenueSelect: (id: string) => void;
}

const SearchVenues: React.FC<SearchVenuesProps> = ({
  onSearch,
  venues,
  onVenueSelect,
}) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted index
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle input change in search box
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
    setDropdownOpen(true);
    setHighlightedIndex(-1); // Reset highlighted index when user types
  };

  // Handle form submission (e.g., pressing Enter)
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
    setDropdownOpen(false);
  };

  // Handle venue selection from dropdown
  const handleVenueSelect = (venueId: string) => {
    onVenueSelect(venueId);
    setQuery(""); // Optionally clear the input
    setDropdownOpen(false); // Close dropdown after selection
    if (inputRef.current) {
      inputRef.current.focus(); // Keep focus on the input field
    }
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

  // Filter and sort venues (search through all venues, not just filtered ones)
  const sortedFilteredVenues = venues
    .filter((venue) => venue.name.toLowerCase().startsWith(query.toLowerCase()))
    .concat(
      venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase()) &&
          !venue.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );

  // Handle keyboard navigation in the dropdown
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      // Move down
      setHighlightedIndex((prev) =>
        prev < sortedFilteredVenues.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      // Move up
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      // Select highlighted venue
      handleVenueSelect(sortedFilteredVenues[highlightedIndex].id);
    } else if (event.key === "Escape") {
      // Close the dropdown on Escape key
      setDropdownOpen(false);
    }
  };

  // Focus on the input when the dropdown is open
  useEffect(() => {
    if (inputRef.current && isDropdownOpen) {
      inputRef.current.focus();
    }
  }, [isDropdownOpen]);

  return (
    <section className="bg-secondary h-21 w-full flex justify-center align-middle items-center">
      <div className="max-w-7xl w-full">
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-4 p-4 w-full"
        >
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              placeholder="Search venues..."
              className="border rounded p-3 w-full mt-2 mb-2 text-sm bg-white text-dark shadow-md focus:outline-none focus:ring-2 focus:ring-accent-dark transition-all duration-300 ease-in-out pl-4 pr-10"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
              <FiSearch />
            </span>
          </div>
        </form>

        {isDropdownOpen && query && sortedFilteredVenues.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute z-50 mt-1 bg-white border border-gray-300 shadow-lg rounded"
          >
            {sortedFilteredVenues.map((venue, index) => (
              <li
                key={venue.id}
                onClick={() => handleVenueSelect(venue.id)}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                  highlightedIndex === index
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onMouseEnter={() => setHighlightedIndex(index)} // Update highlighted index on hover
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
