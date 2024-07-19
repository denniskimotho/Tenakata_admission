import { useEffect, useState } from "react";
import "./App.css";

function StudentsList() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/students`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);

        actualData.sort((a, b) => b.adm_score - a.adm_score);
      

        setData(actualData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <div className="table table-striped table-hover">
      <tbody>
      <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>GPS Location</th>
          <th>Adm Score</th>
          <th></th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td><img src={item.photo}></img></td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.gender}</td>
            <td>{item.age}</td>
            <td>{item.latitude},{item.longitude}</td>
            <td>{item.adm_score}</td>
          </tr>
        ))}
      </tbody>
    </div>
    </div>
  );
}

export default StudentsList;