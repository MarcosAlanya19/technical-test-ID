import { EStatus, IOrderWithId } from '@/interface/order.interface';
import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import styled from 'styled-components';
import ActionButtons from './ActionsButtons';

const ContentContainer = styled.div`
  padding: 1rem;
`;

const SeparatorLine = styled.div`
  border-top: 1px solid #ccc;
  margin: 5px 0 10px 0;
`;

const CardName = styled.div`
  display: flex;
`;

const CardNumber = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 0.4rem;
`;

const CardTitle = styled.h2`
  font-size: 1.1rem;
`;

const CardParragraft = styled.p`
  font-size: 0.8;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const ContainerParragraft = styled.div`
  width: 100%;
  margin: 1rem 0;
`

const StatusSpan = styled.span`
  background-color: #4caf50;
  text-transform: uppercase;
  color: #fff;
  font-size: 0.875rem;
  padding: 0.125rem 0.8rem;
  border-radius: 1rem;
  background-color:${(props) => (props.children === EStatus.PENDIENTE ? `#f44336;` : props.children === EStatus.PROCESO ? `#3a89c9;` : `#4caf50`)}; // Cambiado a #000000
`;

interface Props {
  data: IOrderWithId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isOpenArray: any[];
  togglePanel: (e: number) => void;
}

const CardContent: React.FC<Props> = ({ data, isOpenArray, togglePanel }) => (
  <ContentContainer>
    {data.plate.map((item, i) => (
      <div key={i} style={{ cursor: 'pointer' }} onClick={() => togglePanel(i)}>
        <CardName>
          <CardNumber>{item.quantity}</CardNumber>
          <CardTitle>{item.name}</CardTitle>
        </CardName>{' '}
        <Disclosure>
          {() => (
            <>
              <Transition
                show={isOpenArray[i]}
                enter='transition-transform ease-in-out duration-1000'
                enterFrom='transform -rotate-180'
                enterTo='transform rotate-0'
                leave='transition-transform ease-in-out duration-1000'
                leaveFrom='transform rotate-0'
                leaveTo='transform -rotate-180'
              >
                <Disclosure.Panel className='text-center'>
                  <ul>
                    {item.ingredients.map((ingredient, j) => (
                      <li key={j}>- {ingredient}</li>
                    ))}
                  </ul>{' '}
                </Disclosure.Panel>
              </Transition>
              <Disclosure.Button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
                <RiArrowDownSLine style={{ transform: isOpenArray[i] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </Disclosure.Button>
              <SeparatorLine />
            </>
          )}
        </Disclosure>
      </div>
    ))}
    <ContainerParragraft>
      <CardParragraft>
        Estatus: <StatusSpan aria-label='ok'>{data.status}</StatusSpan>
      </CardParragraft>
      {data.comment && <CardParragraft>Comentario: {data.comment}</CardParragraft>}
    </ContainerParragraft>
    <ActionButtons data={data} />
  </ContentContainer>
);

export default CardContent;
