import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, parseISO, isSameDay, isBefore } from "date-fns";
import SuccessMessage from "../../UserMessages/SuccessMessage";

interface Booking {
  dateFrom: string;
  dateTo: string;
}

interface BookingFormProps {
  venue: {
    maxGuests: number;
  };
  bookings: Booking[];
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
  bookings,
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
  const today = new Date();

  // Parse and flatten booked date ranges
  const bookedDates = bookings.flatMap((booking) => {
    const start = parseISO(booking.dateFrom);
    const end = parseISO(booking.dateTo);
    return Array.from(
      { length: (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1 },
      (_, i) => addDays(start, i)
    );
  });

  // Disable unavailable dates
  const isDateDisabled = (date: Date) => {
    return (
      isBefore(date, today) ||
      bookedDates.some((bookedDate) => isSameDay(bookedDate, date))
    );
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newGuests = parseInt(e.target.value);
    if (newGuests < minGuests) newGuests = minGuests;
    if (newGuests > maxGuests) newGuests = maxGuests;
    setGuests(newGuests);
  };

  const [showMessage, setShowMessage] = useState(false);

  // Prevent booking from the same day
  const handleDateChange = (date: Date | null, type: "from" | "to") => {
    if (!date) return;

    const newDate = date.toISOString().split("T")[0];

    if (type === "from") {
      setSelectedFromDate(newDate);
      // Ensure 'To Date' is always at least 1 day after 'From Date'
      if (new Date(newDate) >= new Date(selectedToDate)) {
        setSelectedToDate(
          addDays(new Date(newDate), 1).toISOString().split("T")[0]
        );
      }
    } else if (type === "to") {
      // Prevent selecting a 'To Date' that's the same as 'From Date'
      if (new Date(newDate) <= new Date(selectedFromDate)) {
        setSelectedToDate(
          addDays(new Date(selectedFromDate), 1).toISOString().split("T")[0]
        );
      } else {
        setSelectedToDate(newDate);
      }
    }
  };

  return (
    <div className="mt-6 w-full max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Book this venue now
      </h3>
      <form className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              From
            </label>
            <DatePicker
              selected={selectedFromDate ? new Date(selectedFromDate) : null}
              onChange={(date: Date | null) =>
                date && handleDateChange(date, "from")
              }
              minDate={today}
              filterDate={(date) => !isDateDisabled(date)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
              placeholderText="Select a start date"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              To
            </label>
            <DatePicker
              selected={selectedToDate ? new Date(selectedToDate) : null}
              onChange={(date: Date | null) =>
                date && handleDateChange(date, "to")
              }
              minDate={
                selectedFromDate
                  ? addDays(new Date(selectedFromDate), 1)
                  : today
              }
              filterDate={(date) =>
                selectedFromDate
                  ? !isDateDisabled(date) &&
                    new Date(date) > new Date(selectedFromDate)
                  : !isDateDisabled(date)
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
              placeholderText="Select an end date"
            />
          </div>
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

      {/* Success Message */}
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
