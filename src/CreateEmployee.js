import React, { useState, useContext } from 'react';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { EmployeeContext } from './EmployeeContext'; // Importer le contexte
import states from './states';
//import Modal from './Modal';
import Modal from 'modal-component-ghislain-jambert/dist/Modal';
import 'modal-component-ghislain-jambert/dist/Modal.css';
//import CustomDate from './CustomDate';
//import './CustomDate.css';
import CustomDate from 'custom-date-ghislain-jambert-p14';
import 'custom-date-ghislain-jambert-p14/dist/CustomDate.css'

const CreateEmployee = () => {
  // Déclaration des états pour gérer les valeurs des dates de naissance et d'embauche
  const [birthDate, setBirthDate] = useState(null); // Stocke la date de naissance sélectionnée
  const [startDate, setStartDate] = useState(null); // Stocke la date d'embauche sélectionnée
  const [showModal, setShowModal] = useState(false); // Contrôle la visibilité du modal de confirmation
  const [newEmployee, setNewEmployee] = useState(null); // Stocke les informations du nouvel employé

  // Accéder à la fonction addEmployee depuis EmployeeContext via useContext
  const { addEmployee } = useContext(EmployeeContext); 
  const navigate = useNavigate(); // Permet la navigation après l'enregistrement

  // Fonction pour formater une date au format local (ISO 8601 sans l'heure)
  const formatLocalDate = (date) => {
    if (!date) return ''; // Si aucune date n'est fournie, retourner une chaîne vide
    const offset = date.getTimezoneOffset(); // Calculer l'offset du fuseau horaire
    const localDate = new Date(date.getTime() - offset * 60 * 1000); // Ajuster l'heure locale
    return localDate.toISOString().split('T')[0]; // Retourner la date au format AAAA-MM-JJ
  };
  
  // Fonction pour enregistrer un employé temporairement avant confirmation
  const saveEmployee = () => {
    // Collecte des valeurs du formulaire et crée un objet "employé"
    const employee = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      dateOfBirth: birthDate ? formatLocalDate(birthDate) : '', // Formater la date de naissance
      startDate: startDate ? formatLocalDate(startDate) : '', // Formater la date d'embauche
      department: document.getElementById('department').value,
      street: document.getElementById('street').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zipCode: document.getElementById('zip-code').value,
    };
    setNewEmployee(employee); // Stocke les informations du nouvel employé
    setShowModal(true); // Affiche le modal de confirmation
  };

  // Fonction pour confirmer l'enregistrement de l'employé
  const confirmSaveEmployee = () => {
    addEmployee(newEmployee); // Ajoute l'employé au contexte via la fonction addEmployee
    setShowModal(false); // Ferme le modal de confirmation
    navigate('/employee-list'); // Redirige vers la liste des employés après l'ajout
  };

  // Fonction pour fermer le modal sans enregistrer
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Section pour le titre et l'image */}
      <div className="title-create">
        <img className="img-title" src="/assets/image/wealthHealth.png" alt="logo titre" />
        <h1 id="create-employee-form">Create Employee</h1>
      </div>
      <div className="form-contain">
        {/* Formulaire de création d'employé */}
        <form id="create-employee" aria-labelledby="create-employee-form">
          {/* Champ pour le prénom */}
          <label htmlFor="first-name">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            name="firstName" 
            autoComplete="given-name" 
            aria-required="true" 
          />

          {/* Champ pour le nom de famille */}
          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            name="lastName" 
            autoComplete="family-name" 
            aria-required="true" 
          />

          {/* Sélecteur de date pour la date de naissance */}
          <label htmlFor="date-of-birth">Date of Birth</label>
          <CustomDate
            selectedDate={birthDate}
            onDateChange={setBirthDate}
            aria-label="Select Date of Birth"
            id="date-of-birth" 
          />

          {/* Sélecteur de date pour la date d'embauche */}
          <label htmlFor="start-date">Start Date</label>
          <CustomDate
            selectedDate={startDate}
            onDateChange={setStartDate}
            aria-label="Select Start Date"
            id="start-date" 
          />

          {/* Adresse avec plusieurs champs groupés */}
          <fieldset className="address" aria-labelledby="address-legend">
            <legend id="address-legend">Address</legend>
            <label htmlFor="street">Street</label>
            <input 
              id="street" 
              type="text" 
              name="street" 
              autoComplete="street-address" 
              aria-required="true" 
            />

            <label htmlFor="city">City</label>
            <input 
              id="city" 
              type="text" 
              name="city" 
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
              name="zipCode" 
              autoComplete="postal-code" 
              aria-required="true" 
            />
          </fieldset>

          {/* Champ pour le département */}
          <label htmlFor="department">Department</label>
          <select 
            id="department" 
            name="department" 
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

        {/* Bouton pour sauvegarder l'employé */}
        <button 
          className="save-button" 
          onClick={saveEmployee} 
          aria-label="Save Employee"
        >
          Save
        </button>
      </div>

      {/* Modal de confirmation avant enregistrement */}
      <Modal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmSaveEmployee}
        title="Confirm Employee Creation"
      >
        <ul aria-label="Employee Details">
          {/* Afficher les détails de l'employé à confirmer */}
          {newEmployee && Object.entries(newEmployee).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default CreateEmployee;