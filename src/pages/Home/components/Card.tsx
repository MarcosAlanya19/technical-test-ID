import React from 'react';

import { IOrderWithId } from '@/interface/order.interface';
import CardContent from './Card/CardContent';
import CardHeader from './Card/CardHeader';
import { CardContainer } from './styled.component';

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
