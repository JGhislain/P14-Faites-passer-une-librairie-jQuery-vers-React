import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import states from './states';
//import Modal from './Modal';
import Modal from 'modal-component-ghislain-jambert/dist/Modal';
import 'modal-component-ghislain-jambert/dist/Modal.css';

const CreateEmployee = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState(null);

  const navigate = useNavigate();

  // Fonction pour formater la date sans l'heure
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const saveEmployee = () => {
    const employee = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      dateOfBirth: formatDate(birthDate),
      startDate: formatDate(startDate),
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
      <h2>Create Employee</h2>
      <form id="create-employee" aria-labelledby="create-employee-form">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="firstName" autoComplete="given-name" aria-required="true" />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="lastName" autoComplete="family-name" aria-required="true" />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          dateFormat="MM/dd/yyyy"
          id="date-of-birth"
          name="dateOfBirth"
          autoComplete="birthday"
          aria-required="true"
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          id="start-date"
          name="startDate"
          autoComplete="off"
          aria-required="true"
        />

        <fieldset className="address" aria-labelledby="address">
          <legend id="address">Address</legend>
          <label htmlFor="street">Street</label>
          <input id="street" type="text" name="street" autoComplete="street-address" aria-required="true" />

          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" autoComplete="address-level2" aria-required="true" />

          <label htmlFor="state">State</label>
          <select id="state" name="state" aria-required="true">
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" name="zipCode" autoComplete="postal-code" aria-required="true" />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select id="department" name="department" autoComplete="organization" aria-required="true">
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>

      <button className='save-button' onClick={saveEmployee} aria-label="Save Employee">Save</button>

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