import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import './Signup.css';
import { authentication } from '../../Components/Confifdetails/Config';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { setDoc,doc } from 'firebase/firestore'; 
import { db } from '../../Components/Confifdetails/Config';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate=useNavigate()
    const[signupDetails,setsignupDetails]=useState({
        name:'',email:'',password:'',role:''
    })
   const handlesignupdeatilsSubmit=async(e)=>{
    e.preventDefault()
    try{

    
  const Accountscreated=  await createUserWithEmailAndPassword(authentication,signupDetails.email,signupDetails.password)
  alert("accounts created in firestore")
  console.log(Accountscreated)

    await updateProfile(Accountscreated.user,{
        displayName:signupDetails.name
      })      

     const docref= await doc(db,`${signupDetails.role}s`,signupDetails.name)   
     setDoc(docref,{
           name:signupDetails.name,
           email:signupDetails.email,
           role:signupDetails.role,
           id:Date.now()
     })      
    alert("the data has successfully submited")
    navigate('/Login')
    }catch(err){
      console.log(err,'error in signup')
      alert("error in signup")
    }
   }
  return (
    <div className="signup-container">
      <Form className="signup-form shadow p-4 rounded" onSubmit={handlesignupdeatilsSubmit}>
        <h2 className="text-center mb-4">Signup</h2>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setsignupDetails({...signupDetails,name:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"  onChange={(e)=>setsignupDetails({...signupDetails,email:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" onChange={(e)=>setsignupDetails({...signupDetails,password:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select onChange={(e)=>setsignupDetails({...signupDetails,role:e.target.value})}>
            <option>Choose your role</option>
            <option value="visaprovider">Visa Provider</option>
            <option value="visagrabber">Visa Grabber</option>
          </Form.Select>
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" type='submit'>Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;
