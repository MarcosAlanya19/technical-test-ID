import { Tab } from '@headlessui/react';
import React from 'react';

import { config } from '@/config';
import { useAppSelector } from '@/hooks/store';
import { EStatus, IOrderWithId } from '@/interface/order.interface';
import { BtnContainer, BtnStyled, CardsContainer, HomeContainer, MessageContainer, StyledComponent, StyledTab, StyledTabList } from './styled.component';
import Card from './components/Card';

const Home = () => {
  const ordersFromStore = useAppSelector<IOrderWithId[]>((state) => state.orders);
  const [orders, setOrders] = React.useState(ordersFromStore);
  const [selectedTab, setSelectedTab] = React.useState<EStatus>(EStatus.PENDIENTE);

  const orderCategories = Object.values(EStatus);
  const filteredOrders = (status: EStatus) => orders.filter((order) => order.status === status);

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

      <StyledComponent>
        <Tab.Group>
          <StyledTabList>
            {orderCategories.map((category) => (
              <StyledTab key={category} selected={selectedTab === category} onClick={() => setSelectedTab(category)}>
                {category}
              </StyledTab>
            ))}
          </StyledTabList>
          <Tab.Panels>
            {orderCategories.map((category) => (
              <Tab.Panel key={category}>
                <CardsContainer>
                  {filteredOrders(category).map((order) => (
                    <Card key={order.id} data={order} />
                  ))}
                  {filteredOrders(category).length === 0 && <MessageContainer>No hay órdenes en esta categoría</MessageContainer>}
                </CardsContainer>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </StyledComponent>
    </HomeContainer>
  );
};

export default Home;
