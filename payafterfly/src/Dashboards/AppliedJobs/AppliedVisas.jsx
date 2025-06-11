import React, { useEffect, useState } from 'react';
import { db } from '../../Components/Confifdetails/Config';
import { doc, getDoc } from 'firebase/firestore';
import styled, { keyframes } from 'styled-components';
import { FaFileAlt, FaSpinner, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaFlag, FaBuilding } from 'react-icons/fa';

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

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d3748;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const VisaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;

const VisaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  transition: all 0.3s ease;
  animation: ${cardEntrance} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  border-left: 4px solid #4facfe;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  &:nth-child(odd) {
    border-left-color: #00f2fe;
  }
  
  &:nth-child(3n) {
    border-left-color: #f5576c;
  }

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #4facfe;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
    
    svg {
      font-size: 1.1rem;
    }
  }
`;

const DetailItem = styled.div`
  margin: 0.6rem 0;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 1.5;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: flex-start;
    font-size: 0.95rem;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #555;
  min-width: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  
  svg {
    margin-right: 6px;
    color: #777;
    font-size: 0.8rem;
  }

  @media (min-width: 576px) {
    margin-bottom: 0;
    min-width: 120px;
    
    svg {
      font-size: 0.9rem;
    }
  }
`;

const DetailValue = styled.span`
  color: #333;
  flex: 1;
  word-break: break-word;
`;

const SalaryValue = styled(DetailValue)`
  color: #28a745;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 500px;
  margin: 0 auto;
  
  svg {
    width: 60px;
    height: 60px;
    color: #4facfe;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  @media (min-width: 768px) {
    padding: 3rem;
    
    svg {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
    }
  }
`;

const EmptyTitle = styled.h3`
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const EmptyText = styled.p`
  color: #777;
  font-size: 0.95rem;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(79, 172, 254, 0.2);
  border-top: 3px solid #4facfe;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    border-width: 4px;
    margin-bottom: 1.5rem;
  }
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 0.95rem;
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  svg {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
  }
`;

const AppliedVisas = () => {
  const Loggedinuser = JSON.parse(localStorage.getItem("Visagrabber"));
  const [loading, setLoading] = useState(true);
  const [appliedVisas, setAppliedVisas] = useState([]);

  useEffect(() => {
    const fetchAppliedVisas = async () => {
      try {
        const docRef = doc(db, "visagrabbers", Loggedinuser.user.displayName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const savedJobs = docSnap.data().appliedVisa || [];
          setAppliedVisas(savedJobs);
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error in fetching:", err);
        setLoading(false);
      }
    };
    
    fetchAppliedVisas();
  }, [Loggedinuser.user.displayName]);

  const handleback = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <LoadingState>
        <Spinner />
        <LoadingText>Loading your applied visas...</LoadingText>
      </LoadingState>
    );
  }

  if (appliedVisas.length === 0) {
    return (
      <EmptyState>
        <FaFileAlt />
        <EmptyTitle>No Visas Applied Yet</EmptyTitle>
        <EmptyText>When you apply for visas, they will appear here.</EmptyText>
        <BackButton onClick={handleback}>
          ← Back to Previous
        </BackButton>
      </EmptyState>
    );
  }

  return (
    <Container>
      <Title>Your Applied Visas</Title>
      <BackButton onClick={handleback}>
        ← Back to Previous
      </BackButton>
      <VisaGrid>
        {appliedVisas.map((appliedJob, index) => (
          <VisaCard key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <CompanyName>
              <FaBuilding /> {appliedJob.companyname}
            </CompanyName>
            
            <DetailItem>
              <DetailLabel><FaFlag /> Visa Type:</DetailLabel>
              <DetailValue>{appliedJob.visatype}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>Name:</DetailLabel>
              <DetailValue>{appliedJob.name}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaMapMarkerAlt /> Country:</DetailLabel>
              <DetailValue>{appliedJob.country}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaBriefcase /> Work Type:</DetailLabel>
              <DetailValue>{appliedJob.work}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaGraduationCap /> Qualification:</DetailLabel>
              <DetailValue>{appliedJob.qualification}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaMapMarkerAlt /> Address:</DetailLabel>
              <DetailValue>{appliedJob.addressofcompany}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaMoneyBillWave /> Salary:</DetailLabel>
              <SalaryValue>₹{appliedJob.salary} / month</SalaryValue>
            </DetailItem>
          </VisaCard>
        ))}
      </VisaGrid>
    </Container>
  );
};

export default AppliedVisas;