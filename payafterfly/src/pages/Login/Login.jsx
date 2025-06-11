import React, { useState } from 'react'
import{signInWithEmailAndPassword} from 'firebase/auth'
import { authentication } from '../../Components/Confifdetails/Config'
import { Form ,Button} from 'react-bootstrap'
import { useNavigate ,Link} from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate()
    const [LoginDetails,setLoginDetails]=useState({
        email:'',password:'',role:''
    })
   const handleLogindeatilsSubmit=async(e)=>{
    e.preventDefault()
    try{

    
    const LoggedinData= await signInWithEmailAndPassword(authentication,LoginDetails.email,LoginDetails.password) 
     alert("login successfull redireccting to dashboard")

     if(LoginDetails.role==='visaprovider'){
        localStorage.setItem('VisaProvider',JSON.stringify(LoggedinData)) 
     }
     else{
         localStorage.setItem('Visagrabber',JSON.stringify(LoggedinData)) 
     }
        navigate(`/${LoginDetails.role}Dashboard`)
    }catch(err){
      console.log(err,'error in login data')
    }

   }
  return (
     <div className="signup-container">
      <Form className="signup-form shadow p-4 rounded" onSubmit={handleLogindeatilsSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"  onChange={(e)=>setLoginDetails({...LoginDetails,email:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" onChange={(e)=>setLoginDetails({...LoginDetails,password:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select onChange={(e)=>setLoginDetails({...LoginDetails,role:e.target.value})}>
            <option>Choose your role</option>
            <option value="visaprovider">Visa Provider</option>
            <option value="visagrabber">Visa Grabber</option>
          </Form.Select>
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" type='submit'>Login</Button>
        <Link to='/signup'> <Button className="w-100 mt-3" variant="primary" type='submit'>Signup</Button></Link>
      </Form>
    </div>
  )
}

export default Login
