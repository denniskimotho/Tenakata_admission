import { React,useState,useEffect }  from 'react'
import { Modal,Button } from 'react-bootstrap';
// npm install react-bootstrap bootstrap 

export default function AddStudent(){


  const [modalShow,setModalShow]=useState(false)
  const handleShowModal = () =>setModalShow(true)
  const handleHideModal = () =>setModalShow(false)
  // const [adm_sco,setScore] = useState()

  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({ latitude, longitude });
          setError('');
          

          try {

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyApdnBLqJeVW4c5tlZ32v8bzVBVWyJnYlg`)
            .then((response) => response.json())
            .then((response)=>{
              const results = response.results;
              if (results.length > 0) {
                const countryComponent = results[0].address_components.find(component =>
                  component.types.includes('country')
                );
                setCountry(countryComponent ? countryComponent.long_name : 'Country not found');
              } else {
                setCountry('Country not found');
              }
          })
            
            .catch((err) => {
              console.log(err.message);
            });
            
            
          } catch (err) {
            setError('Error fetching country data');
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setError('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setError('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              setError('An unknown error occurred.');
              break;
            default:
              setError('An unknown error occurred.');
          }
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const [file, setFile] = useState();
  function upLoadPhoto(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

    const [formData, setFormData] = useState({
      first_name:'',
      last_name:'',
      gender: '',
      age: '',
      iq: '',
      maritalStatus: '',
      latitude:'',
      longitude:''
    });
    const [admissibilityScore, setAdmissibilityScore] = useState(null);

    const saveStudent = ({ first_name,last_name,gender, age, iq, maritalStatus})=>{

      let newData = {
        "first_name": first_name,
      "last_name": last_name,
      "gender": gender,
      "age":age,
      "IQ": iq,
      "marital_status": maritalStatus,
      "latitude": location.latitude,
      "longitude": location.longitude,
        "adm_score":admissibilityScore
      }

      fetch("http://127.0.0.1:5000/students",
        {
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(newData)
        })

        // handleHideModal();
    }
  
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
      e.preventDefault();
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
      // setScore(score);
    };

  return(
    <>
    <Button variant="outline-primary" onClick={ handleShowModal }>Add Student</Button>
    <Modal
      size='lg'
      centered
      show={modalShow}>
      <Modal.Header>Add Student</Modal.Header>
      <Modal.Body>

      <form className="row g-3" onSubmit={saveStudent(formData)}  >

      <div className="col-auto">
      <div className="form-control">
            <input type="file" className="form-control" onChange={upLoadPhoto} />
            <img width={110} height={110} src={file} />
        </div>
        </div>
        <div className="row g-4">
      <div className="col-auto">
          <label>
            First Name
            </label>
            <input  className="form-control"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          
        </div>
        <div className="col-auto">
          <label>
            Last name
            </label>
            <input  className="form-control"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
        </div>
        </div>
        <div className="row g-2">
        <div className="col-auto">
          <label>
            Gender:
            </label>
            <select   className="form-control" required name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
        </div>
         <div className="col-auto">
          <label>
            Age:
            </label>
            <input  className="form-control"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          
        </div>
        </div>
        <div className="row g-2">
        <div className="col-auto">
          <label>
            IQ:
            </label>
            <input  className="form-control"
              type="number"
              name="iq"
              value={formData.iq}
              onChange={handleChange}
              required
            />
        </div>
        
        <div className="col-auto">
          <label>
            Marital Status:
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
               className="form-control col-auto"
            >
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>
        </div>
        <div className="row g-3">
        <div className="col-auto">
        <label> </label>
          <button type="button"  className="btn btn-outline-primary" onClick={ getLocation } >Get GPS</button>
    
  </div>
        <div className="col-auto">
        <div className="row g-2">
        <div className="col-auto">
        <label >Latitude: </label>
        </div>
        <div className="col-auto">
        <input type="text" required className="form-control mb-3 col-auto" placeholder='latitude' value={location.latitude}  onChange={handleChange} />
        </div>
        </div>
        <div className="row g-2">
        <div className="col-auto">
          <label>Longitude: </label>
          </div>
          <div className="col-auto">
          <input type="text" required className="form-control mb-3" placeholder='Longitude' value={location.longitude}  onChange={handleChange} />
        </div>
</div>
</div>

  <div className="col-auto">
  {error && <p style={{ color: 'red' }}>{error}</p>}
        {country && (
          <p>
            Country: {country}
          </p>
        )}
  </div>
  </div>
  <div className="row g-2">
        <div className="col-auto">
    <button type="button" className="btn btn-outline-primary mb-2" onClick={handleSubmit} >Calculate Admissibility</button>
    
  </div> 
    
     
      {admissibilityScore !== null && (
        <div  className="col-auto">
              <h6>Admissibility Score: {admissibilityScore.toFixed(2)}</h6>
        </div>
        
      )
      }
      </div>
      
       </form>


      </Modal.Body>
      <Modal.Footer>
      <div className="row g-2">
      {admissibilityScore !== null && (
       
          <div className="col-auto">
    <button type="submit"  className="btn btn-outline-primary mb-2" >Save Student Details</button>
    
  </div>
       
        
      )
      }
      <div className="col-auto">
      <Button variant="outline-primary" className='mb-4' onClick={ handleHideModal }>Close</Button>
      </div>
      </div>
      </Modal.Footer>

    </Modal>
    
</>
  )
};