import React from 'react'
import "./page.css"
import Dashcard from '../../component/dashcard/dashcard'

const page = () => {
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
            </div>
            <Dashcard
              name="joel"
              phone="69696969"
              location="dead"
            />
                        <Dashcard
              name="joel"
              phone="69696969"
              location="dead"
            />
                        <Dashcard
              name="joel"
              phone="69696969"
              location="dead"
            />
                        <Dashcard
              name="joel"
              phone="69696969"
              location="dead"
            />
            
          
        </div>
      </div>
    </div>
  )
}

export default page
