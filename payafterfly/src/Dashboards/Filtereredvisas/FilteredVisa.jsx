import React from 'react'
import './FilteredVisa.css'
const FilteredVisa = ({setFilDatajobs}) => {
  const handleClick=(role)=>{
      setFilDatajobs(role)
  }
  return (
    <div className='Filter_buttons'>
      <button onClick={()=>handleClick("workvisa")}>WorkVisa</button>
      <button onClick={()=>handleClick("visitvisa")}>Visit+WorkVisa</button>
      <button onClick={()=>handleClick("other")}>Other visas</button>
    </div>
  )
}

export default FilteredVisa
