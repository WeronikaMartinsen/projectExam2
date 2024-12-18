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
  initialVenues: Venue[];
  onVenueSelect: (id: string) => void;
  onSearch: (venues: Venue[]) => void;
}

const SearchVenues: React.FC<SearchVenuesProps> = ({
  initialVenues,
  onVenueSelect,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.trim();
    setQuery(searchQuery);
    setHighlightedIndex(-1);

    if (!searchQuery) {
      setDropdownOpen(false);
      setVenues([]);
      onSearch(initialVenues);
      return;
    }

    setDropdownOpen(true);
    setLoading(true);

    try {
      const results = await getVenues();
      const filtered = results.filter(
        (venue) =>
          venue.location.city
            ?.toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          venue.location.country
            ?.toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          venue.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

      setVenues(filtered);
      onSearch(filtered);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setErrorMessage("Failed to fetch venues. Please try again later.");
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venueId: string) => {
    onVenueSelect(venueId);
    setQuery("");
    setDropdownOpen(false);
    setVenues([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, venues.length - 1));
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleVenueSelect(venues[highlightedIndex].id);
    } else if (event.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <section className="bg-gradient-to-r from-primary via-secondary to-accent h-21 w-full flex justify-center items-center">
      <div className="max-w-5xl w-full relative">
        <div className="flex flex-col items-center gap-4 p-4 w-full">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search venues name, location..."
            className="border rounded p-3 w-full text-sm bg-white text-dark shadow-md focus:outline-none focus:ring-2 focus:ring-accent-dark transition-all duration-300 ease-in-out pl-4 pr-10"
          />
          <span className="absolute top-10 right-8 transform -translate-y-1/2 text-gray-500">
            <FiSearch />
          </span>
        </div>

        {isDropdownOpen && query && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 shadow-lg rounded">
            {loading ? (
              <div className="p-4 text-gray-500">Loading venues...</div>
            ) : venues.length > 0 ? (
              <ul ref={dropdownRef} className="divide-y divide-gray-200">
                {venues.map((venue, index) => (
                  <li
                    key={venue.id}
                    onClick={() => handleVenueSelect(venue.id)}
                    className={`flex justify-between px-4 py-2 cursor-pointer transition-colors ${
                      highlightedIndex === index
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span>{venue.name}</span>
                    <span className="text-sm text-gray-500">
                      {venue.location.city}, {venue.location.country}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-gray-500">No venues found.</div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
        )}
      </div>
    </section>
  );
};

export default SearchVenues;
