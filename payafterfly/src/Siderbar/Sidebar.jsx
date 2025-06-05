import React from 'react'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div style={{display:'flex',flexDirection:'column', gap:'30px'}}>
      <Link to='visaposting'>PostVisa</Link>
      <Link to='postedvisa'>PostedVisas</Link>
    </div>
  )
}

export default Sidebar