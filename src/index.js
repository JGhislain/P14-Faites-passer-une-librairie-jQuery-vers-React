import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { EmployeeProvider } from './EmployeeContext'; // Importer le EmployeeProvider qui gère le contexte global des employés

// Créer la racine React pour attacher l'application au DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utiliser EmployeeProvider pour englober toute l'application
root.render(
  // Le EmployeeProvider englobe l'ensemble de l'application
  // Cela permet à tous les composants enfants de l'arbre (comme App) d'accéder au contexte des employés
  <EmployeeProvider>
    <App />
  </EmployeeProvider>
);


/*
EmployeeProvider :

Le EmployeeProvider est importé depuis EmployeeContext.js. Il encapsule l'application entière (<App />) et permet à tous les composants enfants d'accéder au contexte des employés. Le EmployeeProvider fournit la liste des employés ainsi que la fonction addEmployee à tous les composants enfants via le EmployeeContext.
ReactDOM.createRoot :

Cette méthode initialise la racine de l'application et permet de "monter" l'arbre de composants dans le DOM. Dans ce cas, l'application est attachée à l'élément HTML dont l'id est root.
Structure de Provider :

Tout ce qui se trouve à l'intérieur de <EmployeeProvider>...</EmployeeProvider> peut accéder aux valeurs partagées par le contexte (comme la liste des employés) sans avoir besoin de passer les données manuellement via des props.
App est l'application principale, qui contient probablement les routes vers différentes pages (comme CreateEmployee et EmployeeList). Ces composants enfants consomment directement les données du contexte.
Pourquoi utiliser un Provider :

Le EmployeeProvider permet d'éviter la transmission répétitive de props à travers plusieurs niveaux de composants. Cela rend le code plus lisible et maintenable. Par exemple, au lieu de passer la liste des employés à chaque composant dans l'arbre de App, tous les composants peuvent simplement consommer cette donnée à l'aide de useContext.
*/