import React, { useState } from "react";
import SuccessMessage from "../../UserMessages/SuccessMessage";

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
  const [showMessage, setShowMessage] = useState(false);

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newGuests = parseInt(e.target.value);
    if (newGuests < minGuests) newGuests = minGuests;
    if (newGuests > maxGuests) newGuests = maxGuests;
    setGuests(newGuests);
  };

  return (
    <div className="mt-6 w-full max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Book this venue now
      </h3>
      <form className="flex flex-col gap-4">
        {/* From Date */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            From
          </label>
          <input
            type="date"
            value={selectedFromDate || ""}
            onChange={(e) => setSelectedFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            To
          </label>
          <input
            type="date"
            value={selectedToDate || ""}
            onChange={(e) => setSelectedToDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Number of Guests
          </label>
          <input
            type="number"
            value={guests}
            min={minGuests}
            max={maxGuests}
            onChange={handleGuestChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
          />
          <small className="text-sm text-gray-500">
            Maximum allowed guests: {maxGuests}
          </small>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={handleBook}
        >
          Book Now
        </button>
      </form>
      {/* Success or Error Message */}
      {showMessage && (
        <SuccessMessage
          message="Congratulations! You have successfully booked this venue!"
          duration={2000}
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
};

export default BookingForm;
