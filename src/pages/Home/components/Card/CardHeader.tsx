import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-weight: 700;
  font-size: 1.4rem;
`;

interface Props {
  tableNumber: number
}

const CardHeader: React.FC<Props> = ({ tableNumber }) => (
  <HeaderContainer>MESA: {tableNumber}</HeaderContainer>
);

export default CardHeader;
