import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { signOut,getAuth } from 'firebase/auth'
const Navbarr = () => {
    const navigate=useNavigate()
    const auth=getAuth()

 let Visaprovider=JSON.parse (localStorage.getItem("VisaProvider")) 
 let Visagrabber=JSON.parse(localStorage.getItem("Visagrabber"))
  const logedinuser= Visaprovider || Visagrabber;
 //console.log(logedinuser)
 const handleLogout=async()=>{
     try{
       await  signOut(auth)
       localStorage.removeItem("VisaProvider") || localStorage.removeItem("Visagrabber")
       alert("logout successfull")
       navigate("/Login")


     }
     catch(err){
        console.log(err,'error in the data')
        alert('error in logout')
     }
 }

  return (
    <div>
       
      <br />
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">PAY AFTER FLY</Navbar.Brand>
          <Nav className="ms-auto" style={{display:'flex',gap:'30px'}}>
          
            {logedinuser ? (<>
               <Button className="w-100 mt-3" variant="primary"  onClick={handleLogout}>Logout</Button>
               { Visagrabber && <><Button className="w-100 mt-3" variant="primary" onClick={()=>navigate('/visagrabberDashboard/savedvisas')} >SavedVisas</Button>
                    <Button className="w-100 mt-3" variant="primary" onClick={()=>navigate('/visagrabberDashboard/appliedvisas')} >AppliedVisas</Button>
              
             
              </> }
                 
            </>):(<>
                 <Link to='/signup' style={{color:'white',textDecoration:'none'}}>SignUp</Link>
            <Link to='/login' style={{color:'white',textDecoration:'none'}}>Login</Link>
            

            </>)}
           
          </Nav>
        </Container>
      </Navbar>

      <br />
    </div>
  )
}

export default Navbarr
