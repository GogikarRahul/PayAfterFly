import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredVisa from '../Filtereredvisas/FilteredVisa';
import DisplayVisas from '../Filtereredvisas/DisplayVisas';
import Savedvisasa from '../SavedVisas/Savedvisasa';
import AppliedVisas from '../AppliedJobs/AppliedVisas';
import styled from 'styled-components';

// Styled Components
const VisaDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  @media (min-width: 769px) {
    flex-direction: row;
    gap: 2%;
  }
`;

const VisaSidebar = styled.div`
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  
  @media (min-width: 769px) {
    width: 20%;
    min-height: 80vh;
    margin-left: 3%;
    position: sticky;
    top: 20px;
    align-self: flex-start;
  }
`;

const VisaMainContent = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  margin-top: 1rem;
  
  @media (min-width: 769px) {
    width: 70%;
    margin-top: 0;
  }
`;

const MobileFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const FilterToggleButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Visagrabber = () => {
  const [filDatajobs, setFilDatajobs] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const params = useParams();

  const rendercomp = () => {
    if (params.savedvisas === 'savedvisas') {
      return <Savedvisasa />;
    } else if (params.savedvisas === 'appliedvisas') {
      return <AppliedVisas />;
    } else {
      return <DisplayVisas filDatajobs={filDatajobs} />;
    }
  };

  return (
    <VisaDashboardContainer>
      {/* Mobile filter header */}
      <MobileFilterHeader>
        <h3>Filters</h3>
        <FilterToggleButton onClick={() => setShowMobileFilters(!showMobileFilters)}>
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </FilterToggleButton>
      </MobileFilterHeader>

      {/* Sidebar - shown by default on desktop, toggleable on mobile */}
      {(showMobileFilters || window.innerWidth >= 769) && (
        <VisaSidebar>
          <FilteredVisa setFilDatajobs={setFilDatajobs} />
        </VisaSidebar>
      )}
      
      {/* Main content */}
      <VisaMainContent>
        {rendercomp()}
      </VisaMainContent>
    </VisaDashboardContainer>
  );
};

export default Visagrabber;