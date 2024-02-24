"use client"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './page.css';

// Firebase configuration (should be moved to a separate file for security)
const firebaseConfig = {
  apiKey: "AIzaSyBC9O_n66JMCDKXF-7tcM6rl60MN2fsI_k",
  authDomain: "elixir-1714c.firebaseapp.com",
  databaseURL: "https://elixir-1714c-default-rtdb.firebaseio.com",
  projectId: "elixir-1714c",
  storageBucket: "elixir-1714c.appspot.com",
  messagingSenderId: "478048172929",
  appId: "1:478048172929:web:ab4ff0aaa3bd05b662c680"
};

const Page = () => {
  const [floatData, setFloatData] = useState(null);

  // Initialize Firebase app outside the component
  const firebaseApp = initializeApp(firebaseConfig);

  useEffect(() => {
    const fetchFloatFromFirebase = async () => {
      const database = getDatabase(firebaseApp);
      const floatRef = ref(database, 'test/float');

      try {
        const snapshot = await get(floatRef);
        const floatVal = snapshot.val();
        setFloatData(floatVal);
        console.log('Fetched float:', floatData);
      } catch (error) {
        console.error('Error fetching float:', error);
      }
    };

    fetchFloatFromFirebase();
  }, []);

  return (
    <>
      <div className="top">
        <h2 className='symptom'>Symptom</h2>
        <p className="symptomtext">djfoidsjfiosdjfoisdjfosjd</p>
      </div>
      <div className="meetinpage">
        <div className="doctormeeting">
          <iframe
            src="https://us04web.zoom.us/j/6511778853?pwd=9pI7nn65LC2G03yF29BsAzMX4LAb6o.1/meetingsdk"
            allow="camera; microphone"
            width={1100}
            height={800}
            className="doctorframe"
          ></iframe>
        </div>
        <div className="rightdatabar">
          <div className="leftdatabar1">
            <h1 className='name'>Joel</h1>
          </div>
          <div className="heartrate sidecar">
            <h3>Heart Rate</h3>
            <p>❤️</p>
            <p>{floatData} BPM</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
