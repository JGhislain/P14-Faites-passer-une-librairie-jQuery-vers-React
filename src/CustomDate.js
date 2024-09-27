import React, { useState, useEffect, useRef } from 'react';
import './CustomDate.css';

const CustomDate = ({ selectedDate, onDateChange, id }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [view, setView] = useState('date'); // 'date', 'month', 'year'
  const today = new Date(); // Date du jour
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : null); // Date initialisée ou null
  const [inputValue, setInputValue] = useState(''); // Laisse vide par défaut avec placeholder
  const calendarRef = useRef(null); // Pour détecter les clics en dehors du calendrier
  const inputRef = useRef(null); // Référence à l'input pour gérer le curseur
  const selectionRef = useRef({ start: 0, end: 0 }); // Référence pour stocker la position du curseur

  useEffect(() => {
    // Met à jour l'input si la date change via le calendrier
    if (date && !isNaN(date.getTime())) {
      setInputValue(formatDateToFrench(date));
    }
  }, [date]);

  useEffect(() => {
    // Ferme le calendrier en cliquant en dehors
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const formatDateToFrench = (d) => {
    return new Intl.DateTimeFormat('fr-CA', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d).replace(/-/g, '/');
  };

  const handleDateClick = (day) => {
    if (date) {
      const newDate = new Date(date.getFullYear(), date.getMonth(), day);
      if (newDate <= today) { // Limite les dates au jour actuel
        setDate(newDate);
        onDateChange(newDate);
        setInputValue(formatDateToFrench(newDate));
        setShowCalendar(false);
      }
    }
  };

  const handleMonthClick = (month) => {
    if (date) {
      const newDate = new Date(date.getFullYear(), month, date.getDate());
      setDate(newDate);
      setView('date');
    }
  };

  const handleYearClick = (year) => {
    if (date) {
      const newDate = new Date(year, date.getMonth(), date.getDate());
      setDate(newDate);
      setView('month');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target;
    let inputValue = input.value;
    let cursorPosition = input.selectionStart;

    // Stocker la position du curseur avant la mise à jour
    selectionRef.current = { start: cursorPosition, end: input.selectionEnd };

    // Supprimer tous les caractères non numériques
    let digits = inputValue.replace(/\D/g, '');

    // Formatter la valeur
    let formattedValue = '';
    if (digits.length >= 4) {
      formattedValue = digits.slice(0, 4) + '/';
      if (digits.length >= 6) {
        formattedValue += digits.slice(4, 6) + '/';
        formattedValue += digits.slice(6, 8);
      } else {
        formattedValue += digits.slice(4, 6);
      }
    } else {
      formattedValue = digits;
    }

    // Mettre à jour l'état
    setInputValue(formattedValue);

    // Ajuster la position du curseur après la mise à jour
    setTimeout(() => {
      let newCursorPosition = selectionRef.current.start;

      // Ajuster la position du curseur en fonction des slashes ajoutés ou supprimés
      if (selectionRef.current.start > 4 && digits.length >= 4) {
        newCursorPosition++;
      }
      if (selectionRef.current.start > 6 && digits.length >= 6) {
        newCursorPosition++;
      }

      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);

    // Vérifier si la date est complète et valide
    if (digits.length === 8) {
      const year = digits.slice(0, 4);
      const month = digits.slice(4, 6);
      const day = digits.slice(6, 8);
      const parsedDate = new Date(year, month - 1, day);

      if (
        !isNaN(parsedDate.getTime()) &&
        parsedDate <= today &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= daysInMonth(parsedDate.getMonth(), parsedDate.getFullYear())
      ) {
        setDate(parsedDate);
        onDateChange(parsedDate);
      }
    }
  };

  const handleKeyDown = (e) => {
    const cursorPosition = e.target.selectionStart;

    if ((e.key === 'Backspace' && (cursorPosition === 5 || cursorPosition === 8)) ||
        (e.key === 'Delete' && (cursorPosition === 4 || cursorPosition === 7))) {
      e.preventDefault();

      // Mettre à jour manuellement la valeur et la position du curseur
      let newValue = inputValue;
      let newCursorPosition = cursorPosition;

      if (e.key === 'Backspace' && (cursorPosition === 5 || cursorPosition === 8)) {
        newValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition);
        newCursorPosition = cursorPosition - 1;
      }

      if (e.key === 'Delete' && (cursorPosition === 4 || cursorPosition === 7)) {
        newValue = inputValue.slice(0, cursorPosition) + inputValue.slice(cursorPosition + 1);
        newCursorPosition = cursorPosition;
      }

      setInputValue(newValue);

      // Ajuster la position du curseur après la mise à jour
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
  };

  const renderCalendarDays = () => {
    if (!date) return null;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const numDays = daysInMonth(date.getMonth(), date.getFullYear());
    const days = [];

    // Empty slots for days from previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Actual days of the month
    for (let day = 1; day <= numDays; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      days.push(
        <div
          key={day}
          className={`calendar-day${day === date.getDate() ? ' selected' : ''}`}
          onClick={() => handleDateClick(day)}
          style={{ color: currentDay > today ? 'lightgray' : 'black', cursor: currentDay > today ? 'not-allowed' : 'pointer' }} // Désactiver les dates futures
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderCalendarMonths = () => {
    if (!date) return null;

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months.map((month, index) => (
      <div
        key={index}
        className={`calendar-month${index === date.getMonth() ? ' selected' : ''}`}
        onClick={() => handleMonthClick(index)}
      >
        {month}
      </div>
    ));
  };

  const renderCalendarYears = () => {
    if (!date) return null;

    const years = [];
    const startYear = 1900;
    const currentYear = today.getFullYear();

    for (let i = startYear; i <= currentYear; i++) { // Commence à 1900 jusqu'à l'année actuelle
      years.push(
        <div
          key={i}
          className={`calendar-year${i === date.getFullYear() ? ' selected' : ''}`}
          onClick={() => handleYearClick(i)}
        >
          {i}
        </div>
      );
    }

    return years;
  };

  const toggleCalendar = () => {
    if (date === null) {
      setDate(new Date()); // Initialise à aujourd'hui si aucune date n'est présente
    }
    setShowCalendar(!showCalendar);
    setView('date');
  };

  return (
    <div className="custom-date-picker">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="YYYY/MM/DD"
        aria-label="Date input"
        onClick={toggleCalendar}
        maxLength="10"
      />

      {showCalendar && date && (
        <div className="calendar" ref={calendarRef}>
          <div className="calendar-header">
            {view === 'date' && (
              <>
                <button onClick={() => setView('year')}>
                  {date.getFullYear()}
                </button>
                <button onClick={() => setView('month')}>
                  {date.toLocaleString('default', { month: 'short' })}
                </button>
              </>
            )}
            {view === 'month' && (
              <button onClick={() => setView('year')}>
                {date.getFullYear()}
              </button>
            )}
          </div>

          <div className="calendar-body">
            {view === 'date' && renderCalendarDays()}
            {view === 'month' && renderCalendarMonths()}
            {view === 'year' && renderCalendarYears()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDate;
