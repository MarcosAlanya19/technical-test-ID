import { useOrderActions } from '@/hooks/useOrderActions';
import { EStatus, IOrderWithId } from '@/interface/order.interface';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.625rem;
  width: 100%;
`;

const getActionButtonStyles = (name: ReactNode) => {
  let backgroundColor = '#f44336';

  if (name === EStatus.COMPLETADO) {
    backgroundColor = '#4caf50';
  } else if (name === EStatus.PROCESO) {
    backgroundColor = '#3a89c9';
  }

  return backgroundColor;
};

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => getActionButtonStyles(props.children)};

  &:hover {
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), ${(props) => getActionButtonStyles(props.children)};
  }
`;

interface Props {
  data: IOrderWithId;
}

const ActionButtons: React.FC<Props> = (props) => {
  const { removeOrder, updateOrder } = useOrderActions();

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'styled-confirm-button',
        cancelButton: 'styled-cancel-button',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Está seguro?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'No, cancela',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeOrder(props.data.id);

          swalWithBootstrapButtons.fire({
            title: 'Eliminado',
            text: 'Su orden ha sido eliminada.',
            icon: 'success',
          });
        }
      });
  };

  const handleStatus = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'styled-confirm-button',
        cancelButton: 'styled-cancel-button',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Ya esta en proceso?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, en proceso',
        cancelButtonText: 'No, cancela',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (props.data.status === EStatus.PENDIENTE) {
            updateOrder(props.data.id, { ...props.data, status: EStatus.PROCESO });
          } else if (props.data.status === EStatus.PROCESO) {
            updateOrder(props.data.id, { ...props.data, status: EStatus.COMPLETADO });
          }

          swalWithBootstrapButtons.fire({
            title: 'Eliminado',
            text: 'Su orden ha sido eliminada.',
            icon: 'success',
          });
        }
      });
  };

  return (
    <ButtonsContainer>
      {props.data.status !== EStatus.COMPLETADO && (
        <>
          <ActionButton onClick={handleStatus}>{props.data.status === EStatus.PROCESO ? EStatus.COMPLETADO : EStatus.PROCESO}</ActionButton>
          <ActionButton onClick={handleDelete}>CANCELAR</ActionButton>
        </>
      )}
    </ButtonsContainer>
  );
};

export default ActionButtons;
