import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Siderbar/Sidebar'


const VisaProvider = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Sidebar Container */}
      <div style={{
        width: '270px',
        background: 'linear-gradient(135deg, #2c3e50, #4a6491)',
        color: 'white',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
        padding: '20px 0',
        position: 'sticky',
        top:0,
        height: '96vh',
        zIndex: 10,
        marginLeft:'1%',
        borderRadius:'1rem',
        marginTop:'1%'
      }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '30px',
        overflowY: 'auto',
        background: '#ffffff',
        borderRadius: '10px 0 0 10px',
        boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.05)',
        margin: '20px 20px 20px 0',
        marginLeft:'2%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VisaProvider;