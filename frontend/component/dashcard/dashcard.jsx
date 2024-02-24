import React from 'react'
import "./dashcard.css"
const Dashcard = (props) => {
  return (
    <div className='main1'>
      
              <div><p className="data">{props.name}</p></div>
              <div><p className="data">{props.phone}</p></div>
              <div><p className="data">{props.location}</p></div>
              
            
    </div>
  )
}

export default Dashcard
