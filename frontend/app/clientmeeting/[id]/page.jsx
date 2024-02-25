// "use client"

// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, get, onValue } from 'firebase/database';
// import React, { useEffect, useState } from 'react';
// import './page.css';
// import axios from 'axios';

// // Firebase configuration (should be moved to a separate file for security)
// const firebaseConfig = {
//   apiKey: "AIzaSyBC9O_n66JMCDKXF-7tcM6rl60MN2fsI_k",
//   authDomain: "elixir-1714c.firebaseapp.com",
//   databaseURL: "https://elixir-1714c-default-rtdb.firebaseio.com",
//   projectId: "elixir-1714c",
//   storageBucket: "elixir-1714c.appspot.com",
//   messagingSenderId: "478048172929",
//   appId: "1:478048172929:web:ab4ff0aaa3bd05b662c680"
// };

// const Page = ({ params }) => {
//   const [floatData, setFloatData] = useState(null);
//   const [userData, setUserData] = useState(null); // Initialize userData as null

//   // Initialize Firebase app outside the component
//   const firebaseApp = initializeApp(firebaseConfig);

//   useEffect(() => {
//     const database = getDatabase();
//     const floatRef = ref(database, 'test/float');

//     const unsubscribe = onValue(floatRef, (snapshot) => {
//       const floatVal = snapshot.val();
//       setFloatData(floatVal);
//       console.log('Fetched float:', floatData);
//       axios.post('http://localhost:8080/details', {
//         id: params.id
//       }).then((response) => {
//         console.log(response);
//         setUserData(response.data);
//       });
//     }, (error) => {
//       console.error('Error fetching float:', error);
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   // Render component contents only when userData is not null
//   return userData !== null ? (
//     <>
//       <div className="top">
//         <h2 className='symptom'>{userData.department}</h2>

//       </div>
//       <div className="meetinpage">
//         <div className="doctormeeting">
//           <iframe
//             src="https://us04web.zoom.us/j/6511778853?pwd=9pI7nn65LC2G03yF29BsAzMX4LAb6o.1/meetingsdk"
//             allow="camera; microphone"
//             width={1100}
//             height={800}
//             className="doctorframe"
//           ></iframe>
//         </div>

//       </div>
//     </>
//   ) : null; // Render null if userData is null
// };

// export default Page;

"use client";
import "./page.css";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";

import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyBC9O_n66JMCDKXF-7tcM6rl60MN2fsI_k",
  authDomain: "elixir-1714c.firebaseapp.com",
  databaseURL: "https://elixir-1714c-default-rtdb.firebaseio.com",
  projectId: "elixir-1714c",
  storageBucket: "elixir-1714c.appspot.com",
  messagingSenderId: "478048172929",
  appId: "1:478048172929:web:ab4ff0aaa3bd05b662c680",
};

const page = ({ params }) => {
  const [Razorpay] = useRazorpay();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [floatData, setFloatData] = useState(null);
  const [userData, setUserData] = useState(null); // Initialize userData as null

  // Initialize Firebase app outside the component
  const firebaseApp = initializeApp(firebaseConfig);

  const handlePayment = useCallback(async () => {
    const options = {
      key: "rzp_test_xllCZgdyuf9CfX",
      amount: "20000",
      currency: "INR",
      name: "elixir Corp",
      description: "Test Transaction",
      image: "https://placekitten.com/300/300",
      handler: (res) => {
        console.log(res);
        if (res.razorpay_payment_id) {
          console.log("Payment Successful:", res);
          setPaymentStatus(true);

          // Run your code after successful payment here
          // Example: Send payment confirmation email, update order status, etc.
          // Make sure to use proper server-side communication for security

          // Redirect to success page (optional)
          // Replace with your success page path
        } else {
          console.log("Payment Failed:", res);
          setPaymentStatus(false);
          // Handle failed payment (e.g., display error message, allow retry)
        }
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);
  useEffect(() => {
    const database = getDatabase();
    const floatRef = ref(database, "test/float");

    const unsubscribe = onValue(
      floatRef,
      (snapshot) => {
        const floatVal = snapshot.val();
        setFloatData(floatVal);
        console.log("Fetched float:", floatData);
        axios
          .post("http://localhost:8080/details", {
            id: params.id,
          })
          .then((response) => {
            console.log(response);
            setUserData(response.data);
          });
      },
      (error) => {
        console.error("Error fetching float:", error);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {!paymentStatus && <button onClick={handlePayment}>Click</button>}
      {paymentStatus && (
        <>
          <div className="top">
            <h2 className="symptom">{userData.department}</h2>
          </div>
          <div className="meetinpage">
            <div className="doctormeeting">
              <iframe
                src="https://us04web.zoom.us/j/78871048619?pwd=bzSalrHj9KxR1TjT6duakrxBCvpEZ3.1/meetingsdk"
                allow="camera; microphone"
                width={1100}
                height={800}
                className="doctorframe"
              ></iframe>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
