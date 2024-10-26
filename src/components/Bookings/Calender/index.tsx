import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { Booking } from "../../../service/ApiCalls/Interfaces/venue";

interface CalenderProps {
  bookings: Booking[];
}

const Calender: React.FC<CalenderProps> = ({ bookings }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();

  // Convert booking dates to Date objects and create an array of disabled dates
  const disabledDates = bookings.flatMap((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    return Array.from(
      { length: (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1 },
      (_, i) => addDays(start, i)
    );
  });

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(null); // Reset end date if start date is after end date
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div>
      <h3>Select your booking dates:</h3>
      <div className="flex space-x-4">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="From"
          minDate={today} // Prevent selecting past dates
          filterDate={(date) =>
            !disabledDates.some((d) => d.toDateString() === date.toDateString())
          }
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="To"
          minDate={startDate ? addDays(startDate, 1) : today} // Prevent selecting past dates and ensure end date is after start date
          filterDate={(date) => {
            // Ensure that end date is after start date and not a disabled date
            return (
              !disabledDates.some(
                (d) => d.toDateString() === date.toDateString()
              ) &&
              (!startDate || date > startDate)
            );
          }}
        />
      </div>
    </div>
  );
};

export default Calender;
