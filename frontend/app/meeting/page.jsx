import React from 'react'
import "./page.css"
const page = () => {
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
            <p>60 BPM</p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default page
