import "../../../styles/index.css";
import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addDays, isBefore } from "date-fns";

interface Booking {
  dateFrom: string;
  dateTo: string;
}

interface CalenderProps {
  bookings: Booking[];
  onDateRangeSelect: (fromDate: string, toDate: string) => void;
}

const Calender: React.FC<CalenderProps> = ({ bookings }) => {
  const today = new Date();

  // Convert booking dates to Date objects
  const bookedDates = bookings.flatMap((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    return Array.from(
      { length: (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1 },
      (_, i) => addDays(start, i)
    );
  });

  // State for selected dates
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  // Check if selected dates are available
  const areDatesAvailable = (start: Date | null, end: Date | null) => {
    if (!start || !end) return true;
    return !bookedDates.some((date) => date >= start && date <= end);
  };

  // Disable past dates and booked dates
  const tileDisabled = ({ date }: { date: Date }) => {
    return (
      isBefore(date, today) ||
      bookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      )
    );
  };

  // Handle date change
  const handleDateChange = (value: Date | [Date | null, Date | null]) => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      setDateRange([start, end]);
      if (!areDatesAvailable(start, end)) {
        alert("Selected dates are not available.");
      }
    } else {
      setDateRange([value, null]);
    }
  };

  return (
    <div>
      <Calendar
        onChange={() => handleDateChange}
        tileDisabled={tileDisabled}
        minDate={today}
        value={dateRange}
      />
    </div>
  );
};

export default Calender;
