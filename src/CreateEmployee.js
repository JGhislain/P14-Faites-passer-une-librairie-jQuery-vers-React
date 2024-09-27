import React, { useState } from 'react';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import states from './states';
//import Modal from './Modal';
import Modal from 'modal-component-ghislain-jambert/dist/Modal';
import 'modal-component-ghislain-jambert/dist/Modal.css';
import CustomDate from './CustomDate';
import './CustomDate.css';

const CreateEmployee = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState(null);

  const navigate = useNavigate();

  const formatLocalDate = (date) => {
    if (!date) return '';
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };
  
  const saveEmployee = () => {
    const employee = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      dateOfBirth: birthDate ? formatLocalDate(birthDate) : '',
      startDate: startDate ? formatLocalDate(startDate) : '',
      department: document.getElementById('department').value,
      street: document.getElementById('street').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zipCode: document.getElementById('zip-code').value,
    };
    setNewEmployee(employee);
    setShowModal(true);
  };

  const confirmSaveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    setShowModal(false);
    navigate('/employee-list');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="title-create">
        <img className="img-title" src="/assets/image/wealthHealth.png" alt="logo titre" />
        <h1 id="create-employee-form">Create Employee</h1>
      </div>
      <div className="form-contain">
        <form id="create-employee" aria-labelledby="create-employee-form">
          <label htmlFor="first-name">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            name="firstName"  // Ajout d'un name
            autoComplete="given-name" 
            aria-required="true" 
          />

          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            name="lastName"  // Ajout d'un name
            autoComplete="family-name" 
            aria-required="true" 
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <CustomDate
            selectedDate={birthDate}
            onDateChange={setBirthDate}
            aria-label="Select Date of Birth"
            id="date-of-birth"  // Ajout d'un id
          />

          <label htmlFor="start-date">Start Date</label>
          <CustomDate
            selectedDate={startDate}
            onDateChange={setStartDate}
            aria-label="Select Start Date"
            id="start-date"  // Ajout d'un id
          />

          <fieldset className="address" aria-labelledby="address-legend">
            <legend id="address-legend">Address</legend>
            <label htmlFor="street">Street</label>
            <input 
              id="street" 
              type="text" 
              name="street"  // Ajout d'un name
              autoComplete="street-address" 
              aria-required="true" 
            />

            <label htmlFor="city">City</label>
            <input 
              id="city" 
              type="text" 
              name="city"  // Ajout d'un name
              autoComplete="address-level2" 
              aria-required="true" 
            />

            <label htmlFor="state">State</label>
            <select 
              id="state" 
              name="state" 
              aria-required="true" 
            >
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input 
              id="zip-code" 
              type="number" 
              name="zipCode"  // Ajout d'un name
              autoComplete="postal-code" 
              aria-required="true" 
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select 
            id="department" 
            name="department"  // Ajout d'un name
            autoComplete="organization" 
            aria-required="true"
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </form>

        <button 
          className="save-button" 
          onClick={saveEmployee} 
          aria-label="Save Employee"
        >
          Save
        </button>
      </div>

      <Modal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmSaveEmployee}
        title="Confirm Employee Creation"
      >
        <ul aria-label="Employee Details">
          {newEmployee && Object.entries(newEmployee).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default CreateEmployee;