import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { IOrderWithId } from '@/interface/order.interface';
import { CardName, CardNumber, CardParragraft, CardTitle, ContainerParragraft, ContentContainer, SeparatorLine, StatusSpan } from '../styled.card';
import ActionButtons from './ActionsButtons';

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
