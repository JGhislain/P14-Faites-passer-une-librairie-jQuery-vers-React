import React, { useState } from 'react';
import './CustomDate.css';

const CustomDate = ({ selectedDate, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const parsedDate = new Date(e.target.value);
    if (!isNaN(parsedDate.getTime())) {
      onDateChange(parsedDate);
    }
  };

  const handleDateChange = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    setDay(d);
    setMonth(m);
    setYear(y);
    onDateChange(date);
    setInputValue(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="custom-date-picker">
      <label htmlFor="date-input" className="sr-only">Enter Date</label>
      <input
        type="text"
        id="date-input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="YYYY-MM-DD"
        aria-label="Date input, format YYYY-MM-DD"
      />
      <button onClick={toggleCalendar} aria-expanded={showCalendar} aria-controls="calendar">
        {showCalendar ? 'Close' : 'Open'} Calendar
      </button>

      {showCalendar && (
        <div id="calendar" className="calendar" role="dialog" aria-label="Calendar">
          {/* Ici, ajoutez votre calendrier personnalisé */}
        </div>
      )}

      <div className="date-fields" aria-label="Select day, month, and year">
        <select
          value={day}
          onChange={(e) => handleDateChange(e.target.value, month, year)}
          aria-label="Day"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => handleDateChange(day, e.target.value, year)}
          aria-label="Month"
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => handleDateChange(day, month, e.target.value)}
          aria-label="Year"
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomDate;
