import React, { useState } from 'react';
import { Navbar,Col,Row}from 'react-bootstrap';
import AddStudent from './AddStudent';
import ExcelExport from './ExcelExport';

import AdmissibilityTable from './StudentsList';

const AdmissibilityCalculator = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    iq: '',
    maritalStatus: '',
  });
  const [admissibilityScore, setAdmissibilityScore] = useState(null);

  const calculateAdmissibility = ({ gender, age, iq, maritalStatus }) => {
    age = parseInt(age);
    iq = parseInt(iq);

    if (iq < 100) {
      return 0.0;
    }

    let score = 1.0;

    if (gender.toLowerCase() === 'female') {
      score *= 1.565; // Female candidates have a 56.5% higher chance
    }

    if (age > 43) {
      score *= 2; // People above 43 have 2 times the chances
    } else if (age < 26) {
      score /= 2; // People below 26 have half the chances
    }

    // Marital status is not considered in the score but mentioned for completeness
    if (maritalStatus.toLowerCase() === 'married') {
      // Additional logic can be added here if the concern needs addressing
    }

    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateAdmissibility(formData);
    setAdmissibilityScore(score);
  };

  return (
    <div>

<div className="container-sm">
    <div className="row justify-content-md-center">
      <h2 className='text-center text-success my-5'>Tenakata University</h2>
      <Navbar className="bg-body-tertiary justify-content-center">
       
      <ExcelExport fileName="Tenakata_University" />
       
       <AddStudent/>
     
       <Row>
         <Col xs="auto">
       

         <div className="container text-center">
       
      
       <input type="text" placeholder='Search' className="form-control"  required />
               
     </div>
         </Col>
         
       </Row>
     
   </Navbar>
   <AdmissibilityTable/>
      </div>    
    </div>
    </div>
  );
};

export default AdmissibilityCalculator;
