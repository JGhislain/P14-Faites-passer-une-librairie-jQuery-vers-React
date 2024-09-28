import React, { createContext, useState, useEffect } from 'react';

// Créer un contexte pour partager les informations des employés à travers l'application
export const EmployeeContext = createContext();

// Créer un provider qui fournira les données du contexte à ses composants enfants
export const EmployeeProvider = ({ children }) => {
  // Déclare un état pour stocker la liste des employés
  const [employees, setEmployees] = useState([]);

  // useEffect est utilisé ici pour charger les employés fictifs une fois que le composant est monté
  useEffect(() => {
    // Effectue une requête pour charger les employés fictifs depuis le fichier `employees.json`
    fetch('/employees.json')
      .then((response) => response.json()) // Convertir la réponse en JSON
      .then((data) => {
        setEmployees(data); // Met à jour l'état des employés avec les données reçues
      });
  }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécute qu'une seule fois, au montage

  // Fonction pour ajouter un nouvel employé à la liste actuelle
  const addEmployee = (employee) => {
    // Met à jour l'état en ajoutant le nouvel employé à la liste existante
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  // EmployeeContext.Provider fournit les données du contexte à tous les composants enfants qui en ont besoin
  // Tous les composants qui sont enveloppés par ce Provider pourront accéder à la liste des employés
  // et à la fonction addEmployee via `useContext(EmployeeContext)`
  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children} {/* Tous les enfants de ce provider pourront accéder aux données fournies */}
    </EmployeeContext.Provider>
  );
};


/*
Explication de EmployeeContext.Provider :
Contexte (createContext) : createContext est utilisé pour créer un contexte qui va stocker et partager des données. Le contexte EmployeeContext permet à n'importe quel composant de l'application d'accéder aux informations des employés (comme la liste des employés ou la fonction pour en ajouter) sans avoir à les passer en tant que props à travers chaque composant intermédiaire.

Provider (EmployeeContext.Provider) :

Le Provider agit comme une enveloppe autour des composants qui ont besoin d'accéder aux données du contexte.
Il prend une value (ici { employees, addEmployee }) qui représente les données et les fonctions que tous ses enfants pourront utiliser.
Les enfants de ce Provider peuvent ensuite accéder à ces données en utilisant useContext(EmployeeContext) dans leurs propres composants. Cela permet à des composants comme CreateEmployee.js d'ajouter des employés via la fonction addEmployee et de consulter la liste via la variable employees.
En résumé, EmployeeContext.Provider permet de :

Centraliser les données : Les données des employés sont stockées dans le contexte et accessibles partout dans l'application sans passer explicitement via des props.
Faciliter la gestion d'état global : Avec ce Provider, les composants enfants peuvent interagir avec la liste des employés sans avoir besoin de redéfinir ou de propager ces informations à chaque composant de l'arbre.
Cela améliore la lisibilité et la maintenabilité du code, surtout lorsque les mêmes données sont utilisées dans plusieurs parties de l'application.
*/