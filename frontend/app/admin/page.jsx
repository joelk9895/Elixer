"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page.css";
import Dashcard from '../../component/dashcard/dashcard';

const page = () => {
  const [dashcards, setDashcards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin')
      .then(response => {
        setDashcards(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='main'>
      <div className="container">
        <h2 className='title'>
          Dashboard
        </h2>
        <div className="datacontainers">
          <div className="dashtitles">
            <div><p className="data">Name</p></div>
            <div><p className="data">Phone no</p></div>
            <div><p className="data">Location</p></div>
            <div><p className="data">Status</p></div>

          </div>
          {dashcards.map((dashcards, index) => (
            <Dashcard
              key={index}
              name={dashcards.name}
              phone={dashcards.phoneNumber}
              location={dashcards.location}
              status="NO"

            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;




