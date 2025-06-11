import React, { useEffect, useState } from 'react';
import { db } from '../../Components/Confifdetails/Config';
import { doc, getDoc } from 'firebase/firestore';
import styled, { keyframes } from 'styled-components';
import { FaBookmark, FaSpinner, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaFlag, FaBuilding, FaHeart, } from 'react-icons/fa';

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

const heartBeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const VisaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const VisaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: all 0.3s ease;
  animation: ${cardEntrance} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  border-left: 4px solid #ff6b6b;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  &:nth-child(odd) {
    border-left-color: #4ecdc4;
  }
  
  &:nth-child(3n) {
    border-left-color: #ffbe76;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const BookmarkIcon = styled.div`
  position: absolute;
  top: -10px;
  right: 15px;
  background: #ff6b6b;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
  
  svg {
    animation: ${heartBeat} 1.5s ease infinite;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    top: -8px;
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
  padding-right: 30px;
  
  svg {
    margin-right: 10px;
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding-right: 25px;
  }
`;

const DetailItem = styled.p`
  margin: 0.8rem 0;
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin: 0.7rem 0;
    font-size: 0.9rem;
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    min-width: auto;
    margin-bottom: 0.3rem;
  }
`;

const DetailValue = styled.span`
  color: #333;
  flex: 1;

  @media (max-width: 768px) {
    margin-left: 24px; /* Align with icon */
  }
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
    color: #ff6b6b;
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    svg {
      width: 60px;
      height: 60px;
    }
  }
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const EmptyText = styled.p`
  color: #777;
  font-size: 1.1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 107, 107, 0.2);
  border-top: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4c4c;
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const Savedvisasa = () => {
  const Loggedinuser = JSON.parse(localStorage.getItem("Visagrabber"));
  const [loading, setloading] = useState(true);
  const [savedvisas, setsavedvisas] = useState([]);

  useEffect(() => {
    const fetchsavedVisas = async () => {
      try {
        const docref = doc(db, "visagrabbers", Loggedinuser.user.displayName);
        const Maingetdocref = await getDoc(docref);
        if (Maingetdocref.exists()) {
          const SavedJobs = Maingetdocref.data().Savedjobs || [];
          setsavedvisas(SavedJobs);
        } else {
          console.log("No saved visas found");
        }
        setloading(false);
      } catch (err) {
        console.log(err, "error in fetching");
        setloading(false);
      }
    };
    fetchsavedVisas();
  }, [Loggedinuser.user.displayName]);

  const handleback = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <LoadingState>
        <Spinner />
        <LoadingText>Loading your saved visas...</LoadingText>
      </LoadingState>
    );
  }

  if (!savedvisas || savedvisas.length === 0) {
    return (
      <EmptyState>
        <FaBookmark />
        <EmptyTitle>No Visas Saved Yet</EmptyTitle>
        <EmptyText>When you save visas, they will appear here for quick access.</EmptyText>
      </EmptyState>
    );
  }

  return (
    <Container>
      <h1>Your Saved Visas</h1>
      <StyledButton onClick={handleback}>← Back</StyledButton>
      <VisaGrid>
        {savedvisas.map((savedjob, index) => (
          <VisaCard key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <BookmarkIcon>
              <FaHeart />
            </BookmarkIcon>
            <CompanyName>
              <FaBuilding /> {savedjob.companyname}
            </CompanyName>
            
            <DetailItem>
              <DetailLabel><FaFlag /> Visa Type:</DetailLabel>
              <DetailValue>{savedjob.visatype}</DetailValue>
            </DetailItem>
            
            {savedjob.name && (
              <DetailItem>
                <DetailLabel>Name:</DetailLabel>
                <DetailValue>{savedjob.name}</DetailValue>
              </DetailItem>
            )}
            
            <DetailItem>
              <DetailLabel><FaMapMarkerAlt /> Country:</DetailLabel>
              <DetailValue>{savedjob.country}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaBriefcase /> Work Type:</DetailLabel>
              <DetailValue>{savedjob.work}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaGraduationCap /> Qualification:</DetailLabel>
              <DetailValue>{savedjob.qualification}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaMapMarkerAlt /> Address:</DetailLabel>
              <DetailValue>{savedjob.addressofcompany}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel><FaMoneyBillWave /> Salary:</DetailLabel>
              <SalaryValue>₹{savedjob.salary} / month</SalaryValue>
            </DetailItem>
          </VisaCard>
        ))}
      </VisaGrid>
    </Container>
  );
};

export default Savedvisasa;