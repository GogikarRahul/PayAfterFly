import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Components/Confifdetails/Config';
import styled, { keyframes } from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { FaBuilding, FaGlobe, FaMoneyBillWave, FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash, FaEdit, FaUsers, FaSpinner, FaFileAlt } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const cardEntrance = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }
`;

const VisaCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const VisaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${cardEntrance} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  animation-delay: ${props => props.delay || '0s'};
  border-top: 4px solid #667eea;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  padding: 1.2rem 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VisaName = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #667eea;
  }
`;

const VisaType = styled.span`
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
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  min-width: 120px;
  
  svg {
    margin-right: 8px;
    color: #667eea;
  }
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
`;

const ContactSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
`;

const CardActions = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border: none;
  
  svg {
    margin-right: 5px;
  }
`;

const EditButton = styled(ActionButton)`
  background: rgba(67, 233, 123, 0.1);
  color: #43e97b;
  
  &:hover {
    background: rgba(67, 233, 123, 0.2);
  }
`;

const ApplicationsButton = styled(ActionButton)`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: rgba(245, 87, 108, 0.1);
  color: #f5576c;
  
  &:hover {
    background: rgba(245, 87, 108, 0.2);
  }
`;

const NoVisas = styled.div`
  text-align: center;
  padding: 3rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const NoDataImg = styled.img`
  max-width: 200px;
  margin-bottom: 1.5rem;
`;

const NoDataTitle = styled.h2`
  color: #444;
  margin-bottom: 0.5rem;
`;

const NoDataText = styled.p`
  color: #777;
  margin-bottom: 1.5rem;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

const LoadingText = styled.p`
  color: #666;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    animation: ${slideIn} 0.3s ease-out;
  }
  
  .modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .modal-title {
    font-weight: 600;
  }
`;

const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
  }
  
  tr:hover {
    background-color: rgba(102, 126, 234, 0.05);
  }
`;

const Mypostings = () => {
  const Logindata = JSON.parse(localStorage.getItem("VisaProvider"));
  const [loading, setloading] = useState(true);
  const [visa, setvisa] = useState([]);
  const [openmodal, setopenmodal] = useState(false);
  const [Applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docdata = await doc(db, "visaproviders", Logindata.user.displayName);
        const getdocRef = await getDoc(docdata);
        if (getdocRef.exists()) {
          const data = getdocRef.data();
          setvisa(data.VisaDetails || []);
        }
        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
    fetchData();
  }, [Logindata.user.displayName]);

  const handledeleteitem = async (choosedDeletedItem) => {
    const FilteredDeletedItem = visa.filter((val, index) => index !== choosedDeletedItem);
    const docRef = await doc(db, "visaproviders", Logindata.user.displayName);
    await updateDoc(docRef, {
      VisaDetails: FilteredDeletedItem
    });
    setvisa(FilteredDeletedItem);
    alert("The visa posting has been deleted successfully");
  }

  const handdleApplications = (visas) => {
    setopenmodal(true);
    setApplications(visas.applications || []);
  }

  const handleclose = () => {
    setopenmodal(false);
  }

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading your visa postings...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <PageTitle>My Visa Postings</PageTitle>
      
      {visa.length > 0 ? (
        <VisaCardsContainer>
          {visa.map((val, index) => (
            <VisaCard key={index} delay={`${index * 0.1}s`}>
              <CardHeader>
                <VisaName>
                  <FaBuilding /> {val.name}
                </VisaName>
                <VisaType type={val.visatype.toLowerCase()}>
                  {val.visatype}
                </VisaType>
              </CardHeader>
              
              <CardBody>
                <InfoRow>
                  <InfoLabel><FaBuilding /> Company:</InfoLabel>
                  <InfoValue>{val.companyname}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel><FaGlobe /> Country:</InfoLabel>
                  <InfoValue>{val.country}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel><FaMoneyBillWave /> Salary:</InfoLabel>
                  <InfoValue>{val.salary}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel><FaGraduationCap /> Qualification:</InfoLabel>
                  <InfoValue>{val.qualification}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel><FaBriefcase /> Work:</InfoLabel>
                  <InfoValue>{val.work}</InfoValue>
                </InfoRow>
                
                <ContactSection>
                  <InfoRow>
                    <InfoLabel><FaEnvelope /> Email:</InfoLabel>
                    <InfoValue>{val.email}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel><FaPhone /> Contact:</InfoLabel>
                    <InfoValue>{val.contact}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel><FaMapMarkerAlt /> Address:</InfoLabel>
                    <InfoValue>{val.addressofcompany}</InfoValue>
                  </InfoRow>
                </ContactSection>
              </CardBody>
              
              <CardActions>
                <EditButton>
                  <FaEdit /> Edit
                </EditButton>
                <ApplicationsButton onClick={() => handdleApplications(val)}>
                  <FaUsers /> Applications ({val.applications ? val.applications.length : 0})
                </ApplicationsButton>
                <DeleteButton onClick={() => handledeleteitem(index)}>
                  <FaTrash /> Delete
                </DeleteButton>
              </CardActions>
            </VisaCard>
          ))}
        </VisaCardsContainer>
      ) : (
        <NoVisas>
          <FaFileAlt style={{ fontSize: '5rem', color: '#667eea', opacity: '0.3', marginBottom: '1.5rem' }} />
          <NoDataTitle>No Visa Postings Found</NoDataTitle>
          <NoDataText>You haven't posted any visa opportunities yet.</NoDataText>
          <PrimaryButton>Create New Visa Posting</PrimaryButton>
        </NoVisas>
      )}

      <StyledModal show={openmodal} onHide={handleclose}>
        <Modal.Header closeButton>
          <Modal.Title>Applications for {Applications.name || 'Visa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Applications.length > 0 ? (
            <ApplicationsTable>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Aadhar No</th>
                </tr>
              </thead>
              <tbody>
                {Applications.map((application, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{application.name}</td>
                    <td>{application.email}</td>
                    <td>{application.contact}</td>
                    <td>{application.cardnumber}</td>
                  </tr>
                ))}
              </tbody>
            </ApplicationsTable>
          ) : (
            <NoVisas>
              <FaUsers style={{ fontSize: '3rem', color: '#667eea', opacity: '0.5', marginBottom: '1rem' }} />
              <NoDataTitle>No Applications Yet</NoDataTitle>
              <NoDataText>No one has applied for this visa posting yet.</NoDataText>
            </NoVisas>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleclose}>
            Close
          </Button>
        </Modal.Footer>
      </StyledModal>
    </Container>
  );
}

export default Mypostings;