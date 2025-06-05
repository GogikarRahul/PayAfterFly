import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import FilteredVisa from '../Filtereredvisas/FilteredVisa'
import DisplayVisas from '../Filtereredvisas/DisplayVisas'
import Savedvisasa from '../SavedVisas/Savedvisasa'
const Visagrabber = () => {
    const [filDatajobs,setFilDatajobs]=useState("")
    //console.log(params)
    const params=useParams()
    console.log(params,"params in visagrabber")
function rendercomp(){
  
    if(params.savedvisas==="savedvisas"){
      return <Savedvisasa/>
    }else if(params.appliedvisas==="appliedvisas"){
      return <Appliedvisas/>
    }else{
      return <DisplayVisas filDatajobs={filDatajobs}/>
    }
    
}

   
  return (
    <div style={{display:'flex',gap:'2%'}}>
      <div style={{border:'1px solid black',width:'20%', height:'80vh', marginLeft:'3%', backgroundColor:'lightblue'}}>
     <FilteredVisa setFilDatajobs={setFilDatajobs}/>
      </div>
      <div style={{border:'1px solid black',width:'70%'}}>
    {/* <DisplayVisas filDatajobs={filDatajobs}/> */}
    {/* <Outlet filDatajobs={filDatajobs}/> */}
    {rendercomp()}
      </div>
    </div>
  )
}

export default Visagrabber
