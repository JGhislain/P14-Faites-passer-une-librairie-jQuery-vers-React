import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const columns = [
    { name: 'First Name', selector: 'firstName', sortable: true },
    { name: 'Last Name', selector: 'lastName', sortable: true },
    { name: 'Start Date', selector: 'startDate', sortable: true },
    { name: 'Department', selector: 'department', sortable: true },
    { name: 'Date of Birth', selector: 'dateOfBirth', sortable: true },
    { name: 'Street', selector: 'street', sortable: true },
    { name: 'City', selector: 'city', sortable: true },
    { name: 'State', selector: 'state', sortable: true },
    { name: 'Zip Code', selector: 'zipCode', sortable: true },
  ];

  return (
    <div>
      <h1>Current Employees</h1>
      <DataTable columns={columns} data={employees} pagination />
      <a href="/create-employee">Home</a>
    </div>
  );
};

export default EmployeeList;