import styled from 'styled-components';

const StyledNavbar = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: block;
  }
`;


const StyledMovile = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 767px) {
    display: block;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <StyledNavbar>
      <StyledMovile>KDS</StyledMovile>
      <StyledTitle>Kitchen Display System</StyledTitle>
    </StyledNavbar>
  );
};

export default Header;
