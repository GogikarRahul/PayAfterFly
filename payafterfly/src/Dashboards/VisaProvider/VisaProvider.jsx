// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../../Siderbar/Sidebar'


// const VisaProvider = () => {
//   return (
//     <div style={{
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa',
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     }}>
//       {/* Sidebar Container */}
//       <div style={{
//         width: '270px',
//         background: 'linear-gradient(135deg, #2c3e50, #4a6491)',
//         color: 'white',
//         boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
//         padding: '20px 0',
//         position: 'sticky',
//         top:0,
//         height: '96vh',
//         zIndex: 10,
//         marginLeft:'1%',
//         borderRadius:'1rem',
//         marginTop:'1%'
//       }}>
//         <Sidebar />
//       </div>

//       {/* Main Content Area */}
//       <div style={{
//         flex: 1,
//         padding: '30px',
//         overflowY: 'auto',
//         background: '#ffffff',
//         borderRadius: '10px 0 0 10px',
//         boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.05)',
//         margin: '20px 20px 20px 0',
//         marginLeft:'2%'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//         }}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisaProvider;
// // import React, { useEffect } from 'react';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import Sidebar from '../../Siderbar/Sidebar';
// // import styled, { keyframes } from 'styled-components';
// // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

// // // Animations
// // const fadeIn = keyframes`
// //   from { opacity: 0; transform: translateY(20px); }
// //   to { opacity: 1; transform: translateY(0); }
// // `;

// // const float = keyframes`
// //   0% { transform: translateY(0px); }
// //   50% { transform: translateY(-10px); }
// //   100% { transform: translateY(0px); }
// // `;

// // const gradientFlow = keyframes`
// //   0% { background-position: 0% 50%; }
// //   50% { background-position: 100% 50%; }
// //   100% { background-position: 0% 50%; }
// // `;

// // // Styled Components
// // const LandingContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   height: 100%;
// //   padding: 40px;
// //   animation: ${fadeIn} 0.8s ease-out;
// // `;

// // const HeroTitle = styled.h1`
// //   font-size: 3.5rem;
// //   font-weight: 700;
// //   background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
// //   -webkit-background-clip: text;
// //   background-clip: text;
// //   color: transparent;
// //   margin-bottom: 1.5rem;
// //   text-align: center;
// // `;

// // const HeroSubtitle = styled.p`
// //   font-size: 1.4rem;
// //   color: #4a5568;
// //   max-width: 700px;
// //   text-align: center;
// //   margin-bottom: 3rem;
// //   line-height: 1.6;
// // `;

// // const FeatureGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //   gap: 30px;
// //   width: 100%;
// //   max-width: 1000px;
// //   margin-bottom: 3rem;
// // `;

// // const FeatureCard = styled.div`
// //   background: white;
// //   border-radius: 12px;
// //   padding: 30px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
// //   transition: all 0.3s ease;
// //   border: 1px solid rgba(0, 0, 0, 0.05);
  
// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
// //   }
// // `;

// // const FeatureIcon = styled.div`
// //   width: 60px;
// //   height: 60px;
// //   border-radius: 50%;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   margin-bottom: 20px;
// //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //   color: white;
// //   font-size: 1.8rem;
// //   animation: ${float} 4s ease-in-out infinite;
// // `;

// // const FeatureTitle = styled.h3`
// //   font-size: 1.3rem;
// //   margin-bottom: 15px;
// //   color: #2d3748;
// // `;

// // const FeatureDescription = styled.p`
// //   color: #718096;
// //   line-height: 1.6;
// // `;

// // const DashboardButton = styled.button`
// //   padding: 15px 40px;
// //   font-size: 1.1rem;
// //   font-weight: 600;
// //   border-radius: 50px;
// //   border: none;
// //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //   color: white;
// //   cursor: pointer;
// //   transition: all 0.3s ease;
// //   box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
// //   position: relative;
// //   overflow: hidden;
  
// //   &:hover {
// //     transform: translateY(-3px);
// //     box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
    
// //     &::after {
// //       content: '';
// //       position: absolute;
// //       top: 0;
// //       left: 0;
// //       width: 100%;
// //       height: 100%;
// //       background: linear-gradient(90deg, 
// //         transparent, 
// //         rgba(255,255,255,0.3), 
// //         transparent);
// //       animation: ${gradientFlow} 2s infinite;
// //     }
// //   }
  
// //   &:active {
// //     transform: translateY(1px);
// //   }
// // `;

// // const LandingPage = () => {
// //  // const navigate = useNavigate();

// //   return (
// //     <LandingContainer>
// //       <HeroTitle>Welcome to PayAfterFly Admin</HeroTitle>
// //       <HeroSubtitle>
// //         Manage visa applications, track payments, and oversee your travel services with our powerful dashboard tools.
// //       </HeroSubtitle>
      
// //       <FeatureGrid>
// //         <FeatureCard>
// //           <FeatureIcon>
// //             <i className="fas fa-passport"></i>
// //           </FeatureIcon>
// //           <FeatureTitle>Visa Management</FeatureTitle>
// //           <FeatureDescription>
// //             Easily create, update, and track visa applications with our intuitive interface.
// //           </FeatureDescription>
// //         </FeatureCard>
        
// //         <FeatureCard>
// //           <FeatureIcon>
// //             <i className="fas fa-chart-line"></i>
// //           </FeatureIcon>
// //           <FeatureTitle>Analytics Dashboard</FeatureTitle>
// //           <FeatureDescription>
// //             Get real-time insights into your business performance with beautiful visualizations.
// //           </FeatureDescription>
// //         </FeatureCard>
        
// //         <FeatureCard>
// //           <FeatureIcon>
// //             <i className="fas fa-user-shield"></i>
// //           </FeatureIcon>
// //           <FeatureTitle>Secure Payments</FeatureTitle>
// //           <FeatureDescription>
// //             Manage all payment transactions securely with our integrated payment system.
// //           </FeatureDescription>
// //         </FeatureCard>
// //       </FeatureGrid>
// //     </LandingContainer>
// //   );
// // };

// // const VisaProvider = ({ showLanding = true }) => {
// //   return (
// //     <div style={{
// //       display: 'flex',
// //       minHeight: '100vh',
// //       backgroundColor: '#f5f7fa',
// //       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// //     }}>
// //       {/* Sidebar Container */}
// //       <div style={{
// //         width: '270px',
// //         background: 'linear-gradient(135deg, #2c3e50, #4a6491)',
// //         color: 'white',
// //         boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
// //         padding: '20px 0',
// //         position: 'sticky',
// //         top: 0,
// //         height: '96vh',
// //         zIndex: 10,
// //         marginLeft: '1%',
// //         borderRadius: '1rem',
// //         marginTop: '1%'
// //       }}>
// //         <Sidebar />
// //       </div>

// //       {/* Main Content Area */}
// //       <div style={{
// //         flex: 1,
// //         padding: '30px',
// //         overflowY: 'auto',
// //         background: '#ffffff',
// //         borderRadius: '10px 0 0 10px',
// //         boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.05)',
// //         margin: '20px 20px 20px 0',
// //         marginLeft: '2%'
// //       }}>
// //         <div style={{
// //           maxWidth: '1200px',
// //           margin: '0 auto',
// //         }}>
// //           {showLanding ? <LandingPage /> : <Outlet />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VisaProvider;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Siderbar/Sidebar';
import styled from 'styled-components';

// Styled components for responsive design
const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SidebarContainer = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #2c3e50, #4a6491);
  color: white;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0;
  border-radius: 0;

  @media (min-width: 768px) {
    width: 270px;
    height: 96vh;
    margin-left: 1%;
    border-radius: 1rem;
    margin-top: 1%;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 0;
  box-shadow: none;
  margin: 0;

  @media (min-width: 768px) {
    padding: 30px;
    border-radius: 10px 0 0 10px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
    margin: 20px 20px 20px 0;
    margin-left: 2%;
  }
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

const VisaProvider = () => {
  return (
    <MainContainer>
      {/* Sidebar Container - will be full width on mobile, fixed width on desktop */}
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      {/* Main Content Area */}
      <ContentArea>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </ContentArea>
    </MainContainer>
  );
};

export default VisaProvider;