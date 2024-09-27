import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/employees.json')
      .then(response => response.json())
      .then(data => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees([...data, ...storedEmployees]);
      });
  }, []);

  const columns = [
    { name: 'First Name', selector: (row) => row.firstName, sortable: true },
    { name: 'Last Name', selector: (row) => row.lastName, sortable: true },
    { name: 'Start Date', selector: (row) => row.startDate, sortable: true },
    { name: 'Department', selector: (row) => row.department, sortable: true },
    { name: 'Date of Birth', selector: (row) => row.dateOfBirth, sortable: true },
    { name: 'Street', selector: (row) => row.street, sortable: true },
    { name: 'City', selector: (row) => row.city, sortable: true },
    { name: 'State', selector: (row) => row.state, sortable: true },
    { name: 'Zip Code', selector: (row) => row.zipCode, sortable: true },
  ];

    // Ajout de styles conditionnels pour les lignes alternées
    const customStyles = {
      rows: {
        style: {
          minHeight: '50px', // Taille minimale des lignes
          '&:nth-child(odd)': {
            backgroundColor: '#f1f5f0', // Couleur pour les lignes impaires
          },
          '&:nth-child(even)': {
            backgroundColor: '#e9ece5', // Couleur pour les lignes paires
          },
        },
      },
      headCells: {
        style: {
          backgroundColor: '#4e5a3f', // Couleur des en-têtes
          color: '#ffffff', // Couleur du texte des en-têtes
          textTransform: 'uppercase',
        },
      },
    };

  return (
    <div>
      <div className='title-create'>
        <img className='img-title' src='/assets/image/wealthHealth.png' alt='logo titre' />
        <h1 id="create-employee-form">Create Employee</h1>
      </div>
      <DataTable columns={columns} data={employees} pagination customStyles={customStyles} />
      <a href="/create-employee" aria-label="Go to Create Employee page">Home</a>
    </div>
  );
};

export default EmployeeList;
