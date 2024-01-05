import { config } from '@/config';
import { useAppSelector } from '@/hooks/store';
import { IOrderWithId } from '@/interface/order.interface';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './components/Card';

const HomeContainer = styled.div`
  padding: 1.25rem;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BtnStyled = styled(Link)`
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-weight: 700;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-right: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary_hover};
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: baseline;
  grid-gap: 2rem;
`;

const Home = () => {
  const ordersFromStore = useAppSelector<IOrderWithId[]>((state) => state.orders);
  const [orders, setOrders] = React.useState(ordersFromStore);

  const handleLocalStorageChange = () => {
    const persistedState = JSON.parse(localStorage.getItem(config.LOCALSTORAGE.ORDER) || '{}');
    setOrders(persistedState.orders || []);
  };

  React.useEffect(() => {
    setOrders(ordersFromStore);
    window.addEventListener(config.LOCALSTORAGE.PERSIST, handleLocalStorageChange);
  }, [ordersFromStore]);

  return (
    <HomeContainer>
      <BtnContainer>
        <BtnStyled to={'/nueva-orden'}>AGREGAR ORDEN</BtnStyled>
      </BtnContainer>

      <CardsContainer>
        {orders.map((order) => (
          <Card key={order.id} data={order} />
        ))}
      </CardsContainer>
    </HomeContainer>
  );
};

export default Home;
