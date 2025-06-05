import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../Components/Confifdetails/Config'

const Postvisa = () => {
  const loggedinVisaprovider = JSON.parse(localStorage.getItem("VisaProvider"))
  const [openmodal, setopenmodal] = useState(false)
  const [jobdetails, setjobdetails] = useState({
    name: '', companyname: '', country: '', visatype: '', addressofcompany: '',
    work: '', salary: '', contact: '', qualification: '', email: ''
  })

  const handleClick = () => {
    setopenmodal(true)
  }

  const handleClose = () => {   
    setopenmodal(false)
  }

  const handlesubmitjobdata = async () => {
    alert('Job submitted')
    const docref = doc(db, 'visaproviders', loggedinVisaprovider.user.displayName)
    await updateDoc(docref, {
      VisaDetails: arrayUnion(jobdetails)
    })
    handleClose()
  }

  return (
    <div>
      <Button variant="primary" style={{ textAlign: 'center', marginLeft: '40%', marginTop: '4%' }} onClick={handleClick}>
        Post Visa Details
      </Button>

      <Modal show={openmodal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>VISA DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setjobdetails({ ...jobdetails, name: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setjobdetails({ ...jobdetails, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter company name" onChange={(e) => setjobdetails({ ...jobdetails, companyname: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Enter country name" onChange={(e) => setjobdetails({ ...jobdetails, country: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address of Company</Form.Label>
                  <Form.Control type="text" placeholder="Enter company address" onChange={(e) => setjobdetails({ ...jobdetails, addressofcompany: e.target.value })} required />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Work Type</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Plumber, Chef" onChange={(e) => setjobdetails({ ...jobdetails, work: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control type="tel" placeholder="Enter contact number" onChange={(e) => setjobdetails({ ...jobdetails, contact: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salary per Month</Form.Label>
                  <Form.Control type="number" placeholder="Enter salary" onChange={(e) => setjobdetails({ ...jobdetails, salary: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Visa Type</Form.Label>
                  <Form.Select onChange={(e) => setjobdetails({ ...jobdetails, visatype: e.target.value })} required>
                    <option>Choose visa type</option>
                    <option value="visitvisa">Visit Visa</option>
                    <option value="workvisa">Work Visa</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Qualification Required</Form.Label>
                  <Form.Control type="text" placeholder="Enter qualification" onChange={(e) => setjobdetails({ ...jobdetails, qualification: e.target.value })} required />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlesubmitjobdata}>
            Post Visa Details
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Postvisa
