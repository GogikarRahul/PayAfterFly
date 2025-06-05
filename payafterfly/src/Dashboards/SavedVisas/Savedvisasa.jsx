import React, { useEffect, useState } from 'react';
import { db } from '../../Components/Confifdetails/Config';
import { doc, getDoc } from 'firebase/firestore';
import './Savedvisas.css'; 

const Savedvisasa = () => {
  const Loggedinuser = JSON.parse(localStorage.getItem("Visagrabber"));
  const [loading, setloading] = useState(true);
  const [savedvisas, setsavedvisas] = useState([]);

  useEffect(() => {
    const fetchsavedVisas = async () => {
      try {
        const docref = doc(db, "visagrabbers", Loggedinuser.user.displayName);
        const Maingetdocref = await getDoc(docref);
        const SavedJobs = Maingetdocref.data();
        setsavedvisas(SavedJobs.Savedjobs);
        setloading(false);
      } catch (err) {
        console.log(err, "error in fetching");
      }
    };
    fetchsavedVisas();
  }, []);

  if (loading) {
    return <p>please wait a moment......</p>;
  }

  return (
    <div className="saved-visas-container">
      {savedvisas.map((savedjob, index) => (
        <div className="visa-card" key={index}>
          <h3>{savedjob.companyname}</h3>
          <p><span>Visa Type:</span> {savedjob.visatype}</p>
          <p><span>Name:</span> {savedjob.name}</p>
          <p><span>Country:</span> {savedjob.country}</p>
          <p><span>Work Type:</span> {savedjob.work}</p>
          <p><span>Qualification:</span> {savedjob.qualification}</p>
          <p><span>Company Address:</span> {savedjob.addressofcompany}</p>
          <p><span>Salary:</span> ₹{savedjob.salary} / month</p>
        </div>
      ))}
    </div>
  );
};

export default Savedvisasa;
