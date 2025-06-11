// import React from 'react'
// import {Link} from 'react-router-dom'
// const Sidebar = () => {
//   return (
//     <div style={{display:'flex',flexDirection:'column', gap:'30px'}}>
//       <Link to='visaposting'>PostVisa</Link>
//       <Link to='postedvisa'>PostedVisas</Link>
//     </div>
//   )
// }

// export default Sidebar
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Advanced animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const press = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(1); }
`;

// Luxury button styling
const LuxuryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  margin: 8px 0;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 20px rgba(74, 0, 224, 0.2);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-width: 180px;
  text-align: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    z-index: -1;
    transition: opacity 0.4s ease;
    opacity: 0;
  }
  
  &:hover {
    animation: ${float} 1.5s ease infinite;
    box-shadow: 
      0 8px 16px rgba(0, 0, 0, 0.15),
      0 12px 30px rgba(74, 0, 224, 0.3);
    transform: translateY(-2px);
    
    &:before {
      opacity: 1;
    }
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255,255,255,0.2), 
        transparent);
      animation: ${shimmer} 2s infinite linear;
      z-index: -1;
    }
  }
  
  &:active {
    animation: ${press} 0.3s ease;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 4px 10px rgba(74, 0, 224, 0.2);
  }
`;

const IconWrapper = styled.span`
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  
  ${LuxuryButton}:hover & {
    transform: scale(1.1);
  }
`;

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <LuxuryButton to='visaposting'>
        <IconWrapper>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconWrapper>
        Post Visa
      </LuxuryButton>
      
      <LuxuryButton to='postedvisa'>
        <IconWrapper>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconWrapper>
        Posted Visas
      </LuxuryButton>
    </div>
  );
};

export default Sidebar;