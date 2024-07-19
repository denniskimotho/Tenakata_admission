import React from 'react';
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelExport = ({ fileName }) => {
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
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button className="btn btn-outline-primary"  onClick={exportToExcel}>Export to Excel</button>
  );
}

export default ExcelExport;