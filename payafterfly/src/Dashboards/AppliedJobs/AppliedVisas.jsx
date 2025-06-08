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
  padding: 2rem;
`;

const VisaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const VisaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
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
`;

const CompanyName = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #4facfe;
  }
`;

const DetailItem = styled.p`
  margin: 0.8rem 0;
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #555;
  min-width: 120px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #777;
    font-size: 0.9rem;
  }
`;

const DetailValue = styled.span`
  color: #333;
  flex: 1;
`;

const SalaryValue = styled(DetailValue)`
  color: #28a745;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 500px;
  margin: 0 auto;
  
  svg {
    width: 80px;
    height: 80px;
    color: #4facfe;
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: #777;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(79, 172, 254, 0.2);
  border-top: 4px solid #4facfe;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
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
      </EmptyState>
    );
  }

  return (
    <Container>
      <h1>Your Applied Visas</h1>
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