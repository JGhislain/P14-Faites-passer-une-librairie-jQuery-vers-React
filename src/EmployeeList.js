import React, { useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { EmployeeContext } from './EmployeeContext'; // Importer le contexte des employés

const EmployeeList = () => {
  // Utiliser useContext pour accéder aux employés stockés dans le contexte global
  const { employees } = useContext(EmployeeContext); 

  // Utiliser useEffect pour afficher les employés dans la console quand ils changent
  useEffect(() => {
    console.log('Employees from useContext:', employees); // Affiche les employés dans la console
  }, [employees]); // Le tableau de dépendances s'assure que l'effet est exécuté chaque fois que la liste des employés change

  // Définit les colonnes à afficher dans la table des employés
  const columns = [
    { name: 'First Name', selector: (row) => row.firstName, sortable: true }, // Colonne pour le prénom
    { name: 'Last Name', selector: (row) => row.lastName, sortable: true }, // Colonne pour le nom
    { name: 'Start Date', selector: (row) => row.startDate, sortable: true }, // Colonne pour la date d'embauche
    { name: 'Department', selector: (row) => row.department, sortable: true }, // Colonne pour le département
    { name: 'Date of Birth', selector: (row) => row.dateOfBirth, sortable: true }, // Colonne pour la date de naissance
    { name: 'Street', selector: (row) => row.street, sortable: true }, // Colonne pour la rue
    { name: 'City', selector: (row) => row.city, sortable: true }, // Colonne pour la ville
    { name: 'State', selector: (row) => row.state, sortable: true }, // Colonne pour l'état
    { name: 'Zip Code', selector: (row) => row.zipCode, sortable: true }, // Colonne pour le code postal
  ];

  // Styles personnalisés pour les lignes de la table
  const customStyles = {
    rows: {
      style: {
        minHeight: '50px', // Définir la taille minimale des lignes
        '&:nth-child(odd)': {
          backgroundColor: '#f1f5f0', // Couleur des lignes impaires
        },
        '&:nth-child(even)': {
          backgroundColor: '#e9ece5', // Couleur des lignes paires
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#4e5a3f', // Couleur de fond des en-têtes
        color: '#ffffff', // Couleur du texte des en-têtes
        textTransform: 'uppercase', // Convertir le texte des en-têtes en majuscules
      },
    },
  };

  return (
    <div>
      {/* Titre de la page et logo */}
      <div className='title-create'>
        <img className='img-title' src='/assets/image/wealthHealth.png' alt='logo titre' />
        <h1 id="create-employee-form">Employee List</h1>
      </div>
      
      {/* Table des employés avec pagination et styles personnalisés */}
      <DataTable 
        columns={columns} 
        data={employees} // Les employés proviennent du contexte
        pagination 
        customStyles={customStyles} // Appliquer les styles personnalisés définis plus haut
      />
      
      {/* Lien pour revenir à la page de création d'employé */}
      <a href="/create-employee" aria-label="Go to Create Employee page">Home</a>
    </div>
  );
};

export default EmployeeList;
