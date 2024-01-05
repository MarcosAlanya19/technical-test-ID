import styled from 'styled-components';

const StyledNavbar = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const StyledTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Header = () => {
  return (
    <StyledNavbar>
      <StyledTitle>Kitchen Display System</StyledTitle>
    </StyledNavbar>
  );
};

export default Header;
