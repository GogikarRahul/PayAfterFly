import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Dropdown, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import styled, { keyframes } from 'styled-components';
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt, FaCheckCircle } from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const StyledNavbar = styled(Navbar)`
  @media (max-width: 768px) {
    .navbar-brand {
      font-size: 1.2rem;
    }
  }
`;

const NavItemsContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 15px;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const DesktopNav = styled(Nav)`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileDropdown = styled(Dropdown)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ProfileIcon = styled(CgProfile)`
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ffc107;
    transform: scale(1.1);
  }
`;

const ProfileModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    overflow: hidden;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 0.3s ease-out;
  }

  .modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom: none;
    padding: 1.5rem;
  }

  .modal-title {
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .modal-body {
    padding: 2rem;
    text-align: center;
  }

  .modal-footer {
    border-top: none;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 3rem;
    color: #667eea;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;

  p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;

    &:first-child {
      font-weight: 600;
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.7rem;
    }

    &:nth-child(2) {
      color: #666;
    }
  }
`;

const LogoutButton = styled(Button)`
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 75, 43, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 75, 43, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DoneButton = styled(Button)`
  background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(78, 84, 200, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(78, 84, 200, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #28a745;
  font-weight: 600;
  margin-top: 1rem;
  animation: ${pulse} 1.5s infinite;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex: 1;
  padding: 0 1rem;

  a {
    color: white;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition: color 0.3s;

    &:hover {
      color: #ffc107;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #ffc107;
      transition: width 0.3s;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const Navbarr = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [showModal, setShowModal] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  let Visaprovider = JSON.parse(localStorage.getItem("VisaProvider"));
  let Visagrabber = JSON.parse(localStorage.getItem("Visagrabber"));
  const logedinuser = Visaprovider || Visagrabber;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("VisaProvider");
      localStorage.removeItem("Visagrabber");
      setLogoutSuccess(true);
      setTimeout(() => {
        navigate("/Login");
      }, 1500);
    } catch (err) {
      console.log(err, 'error in the data');
      alert('Error in logout');
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <StyledNavbar bg="primary" data-bs-theme="dark" expand="md" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">PAY AFTER FLY</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav className="me-auto w-100 justify-content-center">
              <NavLinksContainer>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#destinations">Destinations</a>
                <a href="#testimonials">Success Stories</a>
              </NavLinksContainer>
            </Nav> */}

            <Nav className="ms-auto">
              <NavItemsContainer>
                {logedinuser ? (
                  <>
                    {Visagrabber && (
                      <>
                        <DesktopNav>
                          <Button variant="light" onClick={() => navigate('/visagrabberDashboard/savedvisas')}>
                            Saved Visas
                          </Button>
                          <Button variant="light" onClick={() => navigate('/visagrabberDashboard/appliedvisas')}>
                            Applied Visas
                          </Button>
                        </DesktopNav>

                        <MobileDropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Menu
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate('/visagrabberDashboard/savedvisas')}>
                              Saved Visas
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/visagrabberDashboard/appliedvisas')}>
                              Applied Visas
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </MobileDropdown>
                      </>
                    )}

                    <ProfileIcon onClick={handleOpenModal} />
                  </>
                ) : (
                  <>
                    <Link to='/signup' className="nav-link text-white">SignUp</Link>
                    <Link to='/login' className="nav-link text-white">Login</Link>
                      <Nav className="me-auto w-100 justify-content-center">
              <NavLinksContainer>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#destinations">Destinations</a>
                <a href="#testimonials">Success Stories</a>
              </NavLinksContainer>
            </Nav>
                    
                  </>
                )}
              </NavItemsContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <ProfileModal 
        show={showModal} 
        onHide={handleCloseModal}
        centered
        backdrop="static"
        style={{ top: '10%' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileAvatar>
            <CgProfile style={{ fontSize: '3rem' }} />
          </ProfileAvatar>

          <UserInfo>
            <p>{logedinuser?.user?.displayName || 'User Name'}</p>
            <p>{logedinuser?.user?.email || 'user@example.com'}</p>
          </UserInfo>

          {!logoutSuccess ? (
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </LogoutButton>
          ) : (
            <SuccessMessage>
              <FaCheckCircle /> Logout successful!
            </SuccessMessage>
          )}
        </Modal.Body>
        <Modal.Footer>
          <DoneButton onClick={handleCloseModal}>
            Done
          </DoneButton>
        </Modal.Footer>
      </ProfileModal>
    </>
  );
};

export default Navbarr;
