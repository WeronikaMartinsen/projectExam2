import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { Venue } from "../../../service/ApiCalls/Interfaces/venue";
import { FiSearch } from "react-icons/fi";
import { getVenues } from "../../../service/apiRequests";

interface SearchVenuesProps {
  initialVenues: Venue[]; // Initial venues for default display
  onVenueSelect: (id: string) => void;
  onSearch: (venues: Venue[]) => void; // Pass matching venues to parent
}

const SearchVenues: React.FC<SearchVenuesProps> = ({
  initialVenues,
  onVenueSelect,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState<Venue[]>(initialVenues); // Manage the current displayed venues
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.trim().toLowerCase();
    setQuery(searchQuery);
    setHighlightedIndex(-1);

    if (searchQuery === "") {
      setDropdownOpen(false);
      setVenues(initialVenues); // Reset to initial venues
      onSearch(initialVenues); // Notify parent with all initial venues
      return;
    }

    setDropdownOpen(true);
    setLoading(true);

    try {
      // Fetch all venues based on query
      const results = await getVenues(1, 100, searchQuery);

      // Filter to match names starting with the query
      const filtered = results.filter(
        (venue) => venue.name.toLowerCase().startsWith(searchQuery) // Ensure names start with the query
      );

      setVenues(filtered); // Update dropdown with matches
      onSearch(filtered); // Notify parent with matching venues
    } catch (error) {
      console.error("Error fetching venues:", error);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle venue selection
  const handleVenueSelect = (venueId: string) => {
    onVenueSelect(venueId); // Notify parent component of the selection
    setQuery(""); // Clear search input
    setDropdownOpen(false);
    setVenues(initialVenues); // Reset to initial venues
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < venues.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleVenueSelect(venues[highlightedIndex].id);
    } else if (event.key === "Escape") {
      setDropdownOpen(false);
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
  }, []);

  return (
    <section className="bg-secondary h-21 w-full flex justify-center align-middle items-center">
      <div className="max-w-5xl w-full">
        <form className="flex justify-center items-center gap-4 p-4 w-full">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search venues..."
              className="border rounded p-3 w-full mt-2 mb-2 text-sm bg-white text-dark shadow-md focus:outline-none focus:ring-2 focus:ring-accent-dark transition-all duration-300 ease-in-out pl-4 pr-10"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
              <FiSearch />
            </span>
          </div>
        </form>

        {isDropdownOpen && query && (
          <div>
            {loading ? (
              <p>Loading venues...</p>
            ) : venues.length > 0 ? (
              <ul
                ref={dropdownRef}
                className="absolute z-50 mt-1 bg-white border border-gray-300 shadow-lg rounded"
              >
                {venues.map((venue, index) => (
                  <li
                    key={venue.id}
                    onClick={() => handleVenueSelect(venue.id)}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
                      highlightedIndex === index
                        ? "bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span className="font-medium">{venue.name}</span>
                    <span className="text-sm text-gray-500">
                      {venue.location.city}, {venue.location.country}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No venues found</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchVenues;
