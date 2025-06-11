// import React from 'react';
// import './FilteredVisa.css';

// const FilteredVisa = ({ setFilDatajobs }) => {
//   const handleClick = (role) => {
//     setFilDatajobs(role);
//   };

//   return (
//     <div className='Filter_buttons'>
//       <button onClick={() => handleClick("workvisa")}>Work Visa</button>
//       <button onClick={() => handleClick("visitvisa")}>Visit + Work Visa</button>
//       <button onClick={() => handleClick("other")}>Other Visas</button>
//     </div>
//   );
// };

// export default FilteredVisa;
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
    margin: 1.5rem 0;
  }
`;

const FilterButton = styled.button`
  background: transparent;
  border: 2px solid #4facfe;
  color: #4facfe;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  min-width: 120px;
  
  &:hover {
    background: #4facfe;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(79, 172, 254, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (min-width: 576px) {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
  
  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    min-width: 140px;
  }
`;

const FilteredVisa = ({ setFilDatajobs }) => {
  const handleClick = (role) => {
    setFilDatajobs(role);
  };

  return (
    <FilterContainer>
      <FilterButton onClick={() => handleClick("workvisa")}>Work Visa</FilterButton>
      <FilterButton onClick={() => handleClick("visitvisa")}>Visit + Work Visa</FilterButton>
      <FilterButton onClick={() => handleClick("other")}>Other Visas</FilterButton>
    </FilterContainer>
  );
};

export default FilteredVisa;
