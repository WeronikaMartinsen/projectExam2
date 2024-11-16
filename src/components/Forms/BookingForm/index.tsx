import React from "react";

interface BookingFormProps {
  venue: {
    maxGuests: number;
  };
  selectedFromDate: string;
  selectedToDate: string;
  setSelectedFromDate: (date: string) => void;
  setSelectedToDate: (date: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  handleBook: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  venue,
  selectedFromDate,
  selectedToDate,
  setSelectedFromDate,
  setSelectedToDate,
  guests,
  setGuests,
  handleBook,
}) => {
  const maxGuests = venue.maxGuests || 1;
  const minGuests = 1;

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newGuests = parseInt(e.target.value);
    if (newGuests < minGuests) newGuests = minGuests;
    if (newGuests > maxGuests) newGuests = maxGuests;
    setGuests(newGuests);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl mb-4">Book This Venue</h3>
      <form className="flex flex-col">
        <div className="mb-4 flex flex-col">
          <label className="text-sm">From Date</label>
          <input
            type="date"
            value={selectedFromDate || ""}
            onChange={(e) => setSelectedFromDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-sm">To Date</label>
          <input
            type="date"
            value={selectedToDate || ""}
            onChange={(e) => setSelectedToDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-sm">Number of Guests</label>
          <input
            type="number"
            value={guests}
            min={minGuests}
            max={maxGuests}
            onChange={handleGuestChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="button"
          className="p-2 bg-primary text-white rounded"
          onClick={handleBook}
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
