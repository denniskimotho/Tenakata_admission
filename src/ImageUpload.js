// src/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch("http://127.0.0.1:5000/students",
        {
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData)
        })
      .then((response) => {
        setMessage('File uploaded successfully');
      })
      .catch((error) => {
        setMessage('File upload failed');
      });
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
