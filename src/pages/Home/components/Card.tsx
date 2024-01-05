import { IOrderWithId } from '@/interface/order.interface';
import React from 'react';

import styled from 'styled-components';
import CardContent from './Card/CardContent';
import CardHeader from './Card/CardHeader';

const CardContainer = styled.div`
  background-color: #fff;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-0.3125rem);
  }
`;

interface Props {
  data: IOrderWithId;
}

const Card: React.FC<Props> = ({ data }) => {
  const [isOpenArray, setIsOpenArray] = React.useState(new Array(data.plate.length).fill(false));

  const togglePanel = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = !updatedIsOpenArray[index];
    setIsOpenArray(updatedIsOpenArray);
  };

  return (
    <CardContainer>
      <CardHeader tableNumber={5} />
      <CardContent data={data} isOpenArray={isOpenArray} togglePanel={togglePanel} />
    </CardContainer>
  );
};

export default Card;
