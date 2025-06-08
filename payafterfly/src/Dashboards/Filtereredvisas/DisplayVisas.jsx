import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../Components/Confifdetails/Config";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCheckCircle, FaBookmark, FaFlag, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import "./DisplayVisas.css";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const SuccessModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    animation: ${fadeIn} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: none;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  text-align: center;
`;

const ModalBody = styled(Modal.Body)`
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled.div`
  color: #28a745;
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: ${bounce} 1s ease, ${pulse} 2s infinite 1s;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-top: 1rem;
  line-height: 1.6;
`;

const ActionButton = styled(Button)`
  margin-top: 1.5rem;
  padding: 0.6rem 2.5rem;
  border-radius: 50px;
  font-weight: 500;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #3a9dec 0%, #00d9e6 100%);
  }
`;

const VisaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  margin-bottom: 1.5rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyName = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const VisaTypeBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch(props.type) {
      case 'work': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'student': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'tourist': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'business': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default: return 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
    }
  }};
  color: white;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  
  &.highlight {
    margin: 1.5rem 0;
    padding: 1rem;
    background: rgba(74, 144, 226, 0.05);
    border-radius: 8px;
    border-left: 3px solid #4a90e2;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  min-width: 120px;
  
  svg {
    margin-right: 8px;
    color: #4a90e2;
  }
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  
  &.country {
    display: flex;
    align-items: center;
  }
  
  &.salary {
    color: #28a745;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const PerMonth = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-left: 4px;
  font-weight: normal;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background: transparent;
  border: 1px solid #4a90e2;
  color: #4a90e2;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
  }
  
  svg {
    margin-right: 5px;
  }
`;

const DetailsButton = styled.button`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonIcon = styled.span`
  margin-left: 8px;
  transition: transform 0.3s ease;
  
  ${DetailsButton}:hover & {
    transform: translateX(3px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4facfe;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #666;
  font-size: 1.1rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const NoResultsImage = styled.img`
  max-width: 200px;
  margin-bottom: 1.5rem;
`;

const NoResultsTitle = styled.h2`
  color: #444;
  margin-bottom: 0.5rem;
`;

const NoResultsText = styled.p`
  color: #777;
`;

const PaymentModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    animation: ${fadeIn} 0.3s ease-out;
  }
  
  .modal-header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
  }
`;

const FormControl = styled(Form.Control)`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #4facfe;
    box-shadow: 0 0 0 0.2rem rgba(79, 172, 254, 0.25);
  }
`;

const PaymentFormLabel = styled(Form.Label)`
  font-weight: 500;
  color: #555;
`;

const PaymentModalFooter = styled(Modal.Footer)`
  border-top: none;
  padding: 1rem 1.5rem;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #3a9dec 0%, #00d9e6 100%);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f0f0f0;
  color: #555;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

const DisplayVisas = ({ filDatajobs }) => {
  const [successmodal, setsuccessmodal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    email: "",
    cardnumber: "",
    CVV: "",
    contact: "",
  });
  const [selectedvisa, setselectedvisa] = useState(null);
  const [openmodal, setopenmodal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alljobs, setAllJobs] = useState([]);
  const [FilDataVisatype, setFilDataVisatype] = useState([]);
  const Loggedinuser = JSON.parse(localStorage.getItem("Visagrabber"));

  useEffect(() => {
    const FetchingData = async () => {
      const docref = collection(db, "visaproviders");
      let AllvisaAdding = [];
      let refgetdocs = await getDocs(docref);
      refgetdocs.docs.map((val) => {
        let Allvisas = val.data().VisaDetails;
        Allvisas.map((val) => {
          AllvisaAdding.push(val);
        });
      });
      setAllJobs(AllvisaAdding);
      setFilDataVisatype(AllvisaAdding);
      setLoading(false);
    };
    FetchingData();
  }, []);

  useEffect(() => {
    const FiltererdData = filDatajobs
      ? alljobs.filter((visa) => visa.visatype === filDatajobs)
      : alljobs;
    setFilDataVisatype(FiltererdData);
  }, [filDatajobs, alljobs]);

  const handleSavedJob = async (savedJob) => {
    try {
      let doc_ref = doc(db, "visagrabbers", Loggedinuser.user.displayName);
      await updateDoc(doc_ref, {
        Savedjobs: arrayUnion(savedJob),
      });
      alert("Successfully saved the job");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async (payment) => {
    if (
      !paymentDetails.name ||
      !paymentDetails.email ||
      !paymentDetails.cardnumber ||
      !paymentDetails.CVV ||
      !paymentDetails.contact
    ) {
      alert("Please fill all payment details");
      return;
    }

    try {
      // Update user's applied visas
      const userDocRef = doc(db, "visagrabbers", Loggedinuser.user.displayName);
      await updateDoc(userDocRef, {
        appliedVisa: arrayUnion(payment),
      });

      // Update visa provider's applications
      const providersSnapshot = await getDocs(collection(db, "visaproviders"));

      for (const providerDoc of providersSnapshot.docs) {
        const providerData = providerDoc.data();
        const visaDetails = providerData.VisaDetails;

        // Find the index of the matching visa
        const visaIndex = visaDetails.findIndex(
          (visa) =>
            visa.companyname === payment.companyname &&
            visa.country === payment.country &&
            visa.visatype === payment.visatype
        );

        if (visaIndex !== -1) {
          // Create a copy of the visa details array
          const updatedVisaDetails = [...visaDetails];

          // Initialize applications array if it doesn't exist
          if (!updatedVisaDetails[visaIndex].applications) {
            updatedVisaDetails[visaIndex].applications = [];
          }

          // Add the new application
          updatedVisaDetails[visaIndex].applications.push({
            ...paymentDetails,
            appliedAt: new Date().toISOString(),
            status: "pending",
          });

          // Update the provider document
          await updateDoc(doc(db, "visaproviders", providerDoc.id), {
            VisaDetails: updatedVisaDetails,
          });

          break; // Exit loop once we've found and updated the matching visa
        }
      }

      setopenmodal(false);
      setsuccessmodal(true);
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("An error occurred while processing your payment");
    }
  };

  const handlesuccess = () => {
    setsuccessmodal(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading visa opportunities...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <div className="visas-container">
      <h1 className="main-title">Available Visa Opportunities</h1>
      {FilDataVisatype.length === 0 ? (
        <NoResults>
          <NoResultsImage src="/images/no-results.svg" alt="No results found" />
          <NoResultsTitle>No visa opportunities found</NoResultsTitle>
          <NoResultsText>Try adjusting your search criteria</NoResultsText>
        </NoResults>
      ) : (
        <div className="cards-container">
          {FilDataVisatype.map((val, index) => (
            <VisaCard key={index}>
              <CardHeader>
                <CompanyName>{val.companyname}</CompanyName>
                <VisaTypeBadge type={val.visatype.toLowerCase()}>
                  {val.visatype}
                </VisaTypeBadge>
              </CardHeader>

              <CardBody>
                <InfoRow>
                  <InfoLabel><FaFlag /> Country:</InfoLabel>
                  <InfoValue className="country">
                    {val.country}
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel><FaBriefcase /> Work Type:</InfoLabel>
                  <InfoValue>{val.work}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel><FaGraduationCap /> Qualification:</InfoLabel>
                  <InfoValue>{val.qualification}</InfoValue>
                </InfoRow>

                <InfoRow className="highlight">
                  <InfoLabel><FaMoneyBillWave /> Salary:</InfoLabel>
                  <InfoValue className="salary">
                    {val.salary} <PerMonth>per month</PerMonth>
                  </InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel><FaMapMarkerAlt /> Company Address:</InfoLabel>
                  <InfoValue>{val.addressofcompany}</InfoValue>
                </InfoRow>
              </CardBody>

              <CardFooter>
                <SaveButton onClick={() => handleSavedJob(val)}>
                  <FaBookmark /> Save Visa
                </SaveButton>
                <DetailsButton
                  onClick={() => {
                    setopenmodal(true);
                    setselectedvisa(val);
                  }}
                >
                  <span>View Full Details</span>
                  <ButtonIcon>→</ButtonIcon>
                </DetailsButton>
              </CardFooter>
            </VisaCard>
          ))}
        </div>
      )}

      <PaymentModal show={openmodal} onHide={() => setopenmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>VISA APPLICATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <PaymentFormLabel>Applicant Name</PaymentFormLabel>
              <FormControl
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <PaymentFormLabel>Email</PaymentFormLabel>
              <FormControl
                type="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    email: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <PaymentFormLabel>Aadhar Number:</PaymentFormLabel>
              <FormControl
                type="text"
                placeholder="Enter AadharNumber"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardnumber: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <PaymentFormLabel>Qualification</PaymentFormLabel>
              <FormControl
                type="text"
                placeholder="Qualification"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    CVV: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <PaymentFormLabel>Contact No</PaymentFormLabel>
              <FormControl
                type="tel"
                placeholder="Enter contact number"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    contact: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <PaymentModalFooter>
          <SecondaryButton onClick={() => setopenmodal(false)}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={() => handlePayment(selectedvisa)}>
            Confirm Application
          </PrimaryButton>
        </PaymentModalFooter>
      </PaymentModal>

      <SuccessModal show={successmodal} onHide={handlesuccess} centered>
        <ModalHeader closeButton>
          <Title>Application Submitted!</Title>
        </ModalHeader>
        <ModalBody>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <Message>
            Thank you for your application! We've successfully received your submission.
            Our team will review your information and reach out to you soon.
          </Message>
          <ActionButton onClick={handlesuccess}>
            Got It
          </ActionButton>
        </ModalBody>
      </SuccessModal>
    </div>
  );
};

export default DisplayVisas;