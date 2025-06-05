import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Components/Confifdetails/Config';
import './Mypostings.css'; 
import {Form,Modal,Button} from 'react-bootstrap'

const Mypostings = () => {
   
  const Logindata = JSON.parse(localStorage.getItem("VisaProvider"));
  const [loading, setloading] = useState(true);
  const [visa, setvisa] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docdata = await doc(db, "visaproviders", Logindata.user.displayName);
        const getdocRef = await getDoc(docdata);
        if (getdocRef.exists()) {
          const data = getdocRef.data();
          setvisa(data.VisaDetails || []);
          setloading(false);
        }

        
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
    fetchData();
    
  }, []);
  const handledeleteitem=async(choosedDeletedItem)=>{
  const FilteredDeletedItem=visa.filter((val,index)=>index !==choosedDeletedItem)
  console.log(FilteredDeletedItem)
   const docRef = await doc(db, "visaproviders", Logindata.user.displayName);
   await updateDoc(docRef,{
    VisaDetails:FilteredDeletedItem
   })
   setvisa(FilteredDeletedItem)
   
  alert("the data has deleted successfully")

}


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your visa postings...</p>
      </div>
    );
  }

  return (
    <div className="mypostings-container">
      <h1 className="page-title">My Visa Postings</h1>
      
      {visa.length > 0 ? (
        <div className="visa-cards-container">
          {visa.map((val, index) => (
            <div 
              className="visa-card"
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <h2 className="visa-name">{val.name}</h2>
                <span className={`visa-type ${val.visatype.toLowerCase()}`}>
                  {val.visatype}
                </span>
              </div>
              
              <div className="card-body">
                <div className="info-row">
                  <span className="info-label">Company:</span>
                  <span className="info-value">{val.companyname}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Country:</span>
                  <span className="info-value">{val.country}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Salary:</span>
                  <span className="info-value">{val.salary}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Qualification:</span>
                  <span className="info-value">{val.qualification}</span>
                </div>
                
                <div className="info-row">
                  <span className="info-label">Work:</span>
                  <span className="info-value">{val.work}</span>
                </div>
                
                <div className="contact-section">
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{val.email}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Contact:</span>
                    <span className="info-value">{val.contact}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{val.addressofcompany}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="action-btn edit-btn" >Edit</button>
                <button className="action-btn delete-btn" onClick={()=>handledeleteitem(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-visas">
          <img src="/images/no-data.svg" alt="No visas found" className="no-data-img" />
          <h2>No Visa Postings Found</h2>
          <p>You haven't posted any visa opportunities yet.</p>
          <button className="primary-btn">Create New Visa Posting</button>
        </div>
      )}

   
    </div>
  );
}

export default Mypostings;