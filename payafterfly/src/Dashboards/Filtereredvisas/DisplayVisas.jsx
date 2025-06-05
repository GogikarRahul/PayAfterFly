import React, { useEffect, useState } from 'react'
import { getDocs, collection ,doc,updateDoc,getDoc,arrayUnion} from 'firebase/firestore'
import { db } from '../../Components/Confifdetails/Config'
import './DisplayVisas.css'
import{Modal,Button,Form} from 'react-bootstrap'

const DisplayVisas = ({ filDatajobs }) => {
    const[openmodal,setopenmodal]=useState(false)
    const [loading, setLoading] = useState(true)
    const [alljobs, setAllJobs] = useState([])
    const [FilDataVisatype, setFilDataVisatype] = useState([])
    const Loggedinuser=JSON.parse(localStorage.getItem("Visagrabber"))

    useEffect(() => {
        const FetchingData = async () => {
            const docref = collection(db, "visaproviders")
            let AllvisaAdding = []
            let refgetdocs = await getDocs(docref)
            refgetdocs.docs.map((val) => {
                let Allvisas = (val.data().VisaDetails)
                Allvisas.map((val) => {
                    AllvisaAdding.push(val)
                })
            })
            setAllJobs(AllvisaAdding)
            setFilDataVisatype(AllvisaAdding)
            setLoading(false)
        }
        FetchingData()
    }, [])

    useEffect(() => { 
        const FiltererdData = filDatajobs ? 
            alljobs.filter((visa) => visa.visatype === filDatajobs) : 
            alljobs
        setFilDataVisatype(FiltererdData)
    }, [filDatajobs, alljobs])

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading visa opportunities...</p>
            </div>
        )
    }
   const handleSavedJob=async(savedJob)=>{
    console.log(savedJob)
           try{
     let doc_ref=doc(db,"visagrabbers",Loggedinuser.user.displayName)
          // console.log(doc_ref)
          const Datasnapshot= await getDoc(doc_ref)
     const UpdatedData= await updateDoc(doc_ref,{
            Savedjobs:arrayUnion(savedJob)
          })
          alert("successfulyy saved the job")
           }
           catch(err){
            console.log(err)
           }
   }
    return (
        <div className="visas-container">
            <h1 className="main-title">Available Visa Opportunities</h1>
            {FilDataVisatype.length === 0 ? (
                <div className="no-results">
                    <img src="/images/no-results.svg" alt="No results found" />
                    <h2>No visa opportunities found</h2>
                    <p>Try adjusting your search criteria</p>
                </div>
            ) : (
                <div className="cards-container">
                    {FilDataVisatype.map((val, index) => (
                        <div className="visa-card" key={index}>
                            <div className="card-header">
                                <h2 className="company-name">{val.companyname}</h2>
                                <span className={`visa-type ${val.visatype.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {val.visatype}
                                </span>
                            </div>
                            
                            <div className="card-body">
                                <div className="info-row">
                                    <span className="info-label">Country:</span>
                                    <span className="info-value country">
                                        <span className="flag-icon"></span>
                                        {val.country}
                                    </span>
                                </div>
                                
                                <div className="info-row">
                                    <span className="info-label">Work Type:</span>
                                    <span className="info-value">{val.work}</span>
                                </div>
                                
                                <div className="info-row">
                                    <span className="info-label">Qualification:</span>
                                    <span className="info-value">{val.qualification}</span>
                                </div>
                                
                                <div className="info-row highlight">
                                    <span className="info-label">Salary:</span>
                                    <span className="info-value salary">
                                        {val.salary} <span className="per-month">per month</span>
                                    </span>
                                </div>
                                
                                <div className="info-row address">
                                    <span className="info-label">Company Address:</span>
                                    <span className="info-value">{val.addressofcompany}</span>
                                </div>
                            </div>
                            <button onClick={()=>handleSavedJob(val)}> save Visa Details</button>
                            
                            <div className="card-footer">
                                <button className="details-button" onClick={()=>setopenmodal(true)}>
                                    <span >View Full Details</span>
                                    <span className="button-icon">→</span>
                                </button>
                            </div>
                            
                            <div className="card-corner"></div>
                        </div>
                    ))}
                </div>
            )}
            {openmodal && 
            <Modal onShow={openmodal}>
        <Modal.Header closeButton>
          <Modal.Title>VISA DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
        <Form.Group className="mb-3">
          <Form.Label>CardHolderNameName</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setjobdetails({...jobdetails,name:e.target.value})}  required/>
        </Form.Group>
           <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"  onChange={(e)=>setjobdetails({...jobdetails,email:e.target.value})} required/>
        </Form.Group>
         <Form.Group className="mb-3">
          <Form.Label>CardNumber:</Form.Label>
          <Form.Control type="text" placeholder="Enter CardNumber" onChange={(e)=>setjobdetails({...jobdetails,companyname:e.target.value})}  required/>
        </Form.Group>
         <Form.Group className="mb-3">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="CVV" onChange={(e)=>setjobdetails({...jobdetails,country:e.target.value})}  required/>
        </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Contact No</Form.Label>
          <Form.Control type="tel" placeholder="Enter contact number" onChange={(e)=>setjobdetails({...jobdetails,contact:e.target.value})} required />
        </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>  
         
          <Button variant="primary">
            ConfirmPayment
          </Button>
        </Modal.Footer>
      </Modal>
           }
        </div>
    )
}

export default DisplayVisas