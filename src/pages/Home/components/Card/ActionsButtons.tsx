import { useOrderActions } from '@/hooks/useOrderActions';
import { EStatus, IOrderWithId } from '@/interface/order.interface';
import Swal from 'sweetalert2';
import { ActionButton, ButtonsContainer } from '../styled.component';

interface Props {
  data: IOrderWithId;
}

const ActionButtons: React.FC<Props> = (props) => {
  const { removeOrder, updateOrder } = useOrderActions();

  const showConfirmationDialog = async (title: string, text: string, confirmButtonText: string, cancelButtonText: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'styled-cancel-button',
        cancelButton: 'styled-confirm-button',
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  const handleDelete = async () => {
    const isConfirmed = await showConfirmationDialog('¿Está seguro?', 'No podrás revertir esto.', 'Sí, bórralo', 'No, cancela');

    if (isConfirmed) {
      removeOrder(props.data.id);

      Swal.fire({
        title: 'Eliminado',
        text: 'Su orden ha sido eliminada.',
      });
    }
  };

  const handleStatus = async () => {
    const isConfirmed = await showConfirmationDialog('¿Ya está en proceso?', 'No podrás revertir esto.', 'Sí, en proceso', 'No, cancela');

    if (isConfirmed) {
      const newStatus = props.data.status === EStatus.PENDIENTE ? EStatus.PROCESO : EStatus.COMPLETADO;
      updateOrder(props.data.id, { ...props.data, status: newStatus });

      Swal.fire({
        title: 'Actualizado',
        text: `El estado de la orden ha sido cambiado a ${newStatus}.`,
      });
    }
  };

  const isOrderNotCompleted = props.data.status !== EStatus.COMPLETADO;

  return (
    <ButtonsContainer>
      {isOrderNotCompleted && (
        <>
          <ActionButton onClick={handleStatus}>{props.data.status === EStatus.PROCESO ? EStatus.COMPLETADO : EStatus.PROCESO}</ActionButton>
        </>
      )}
      <ActionButton onClick={handleDelete}>Eliminar</ActionButton>
    </ButtonsContainer>
  );
};

export default ActionButtons;
