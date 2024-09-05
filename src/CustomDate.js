import React, { useState, useEffect, useRef } from 'react';
import './CustomDate.css';

const CustomDate = ({ selectedDate, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [view, setView] = useState('date'); // 'date', 'month', 'year'
  const today = new Date(); // Date du jour
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : null); // Date initialisée ou null
  const [inputValue, setInputValue] = useState(''); // Laisse vide par défaut avec placeholder
  const calendarRef = useRef(null); // Pour détecter les clics en dehors du calendrier

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
    }).format(d).replace(/-/g, '/'); // Supprimer l'anti-slash ici
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
    let inputValue = e.target.value.replace(/[^\d/]/g, ''); // Limite les caractères non numériques et autres que '/'
    
    // Ajoute des '/' après l'année et le mois une fois les 4 chiffres de l'année et les 2 du mois saisis
    if (inputValue.length === 4 && !inputValue.includes('/')) {
      inputValue = `${inputValue}/`;
    } else if (inputValue.length === 7 && inputValue.split('/').length < 3) {
      inputValue = `${inputValue}/`;
    }

    setInputValue(inputValue);

    // Vérifie si la date est complète et valide
    if (inputValue.length === 10) {
      const [year, month, day] = inputValue.split('/');
      const parsedDate = new Date(year, month - 1, day);

      // Limite à la date d'aujourd'hui
      if (!isNaN(parsedDate.getTime()) && parsedDate <= today) {
        setDate(parsedDate);
        onDateChange(parsedDate);
      }
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
    const currentYear = date.getFullYear();

    for (let i = currentYear - 80; i <= today.getFullYear(); i++) { // Limite à l'année actuelle
      years.push(
        <div
          key={i}
          className={`calendar-year${i === currentYear ? ' selected' : ''}`}
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
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="YYYY/MM/DD"
        aria-label="Date input"
        onClick={toggleCalendar}
        maxLength="10" // Limite l'entrée à 10 caractères
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
