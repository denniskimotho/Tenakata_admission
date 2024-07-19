import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import AdmissibilityCalculator from './App';
import StudentList from './StudentsList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdmissibilityCalculator />
  </React.StrictMode>
);
reportWebVitals();
