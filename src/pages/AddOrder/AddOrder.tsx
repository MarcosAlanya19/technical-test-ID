import { useOrderActions } from '@/hooks/useOrderActions';
import { EStatus, IOrder } from '@/interface/order.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as data from '../../data/data.json';
import { createPlateObject, validateComment, validateSelectedPlates, validateTable } from './helper.addOrder';
import { BtnGroup, ErrorLabel, Form, FormContainer, FormGroup, Input, Label, LinkStyled, PlateContainer, TextArea } from './styled.addOrder';
import { config } from '@/config';
interface ICheckDate {
  plateId: number;
  quantity: number;
}

const AddOrder = () => {
  const [selectedPlates, setSelectedPlates] = React.useState<ICheckDate[]>([]);
  const [formErrors, setFormErrors] = React.useState({});
  const navigate = useNavigate();
  const { addOrder } = useOrderActions();

  const handlePlateCheckboxChange = (plateId: number) => {
    setSelectedPlates((prevSelected) => {
      const existingIndex = prevSelected.findIndex((plate) => plate.plateId === plateId);
      const updatedSelected = existingIndex !== -1
        ? prevSelected.filter((plate) => plate.plateId !== plateId)
        : [...prevSelected, { plateId, quantity: 1 }];

      return updatedSelected;
    });
  };

  const handleQuantityChange = (plateId: number, newQuantity: number) => {
    setSelectedPlates((prevSelected) => {
      const updatedSelected = [...prevSelected];
      const existingIndex = prevSelected.findIndex((plate) => plate.plateId === plateId);

      if (existingIndex !== -1) {
        updatedSelected[existingIndex] = { plateId, quantity: newQuantity };
      }

      return updatedSelected;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const selectedPlatesData = selectedPlates.map((plate) => ({
      plateId: plate.plateId,
      quantity: plate.quantity,
    }));

    const newFormErrors = {
      ...validateSelectedPlates(selectedPlates),
      ...validateTable(parseInt(formData.get('table')?.toString().trim() ?? '')),
      ...validateComment(formData.get('comment')?.toString().trim() as string),
    };

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length > 0) {
      return;
    }

    const plates = createPlateObject(selectedPlatesData, data);

    const orderObject: IOrder = {
      plate: [...plates],
      status: EStatus.PENDIENTE,
      table: parseInt(formData.get('table')?.toString().trim() ?? ''),
      waiter: 'Marcos Alanya',
      comment: formData.get('comment')?.toString().trim() as string,
    };

    addOrder(orderObject);

    Swal.fire({
      title: 'Éxito',
      text: 'La orden se creó de manera exitosa',
    }).then(() => {
      if (Object.keys(newFormErrors).length === 0) {
        navigate(config.ROUTES.HOME);
        e.currentTarget.reset();
      }
    });
  };
  return (
    <Form>
      <FormContainer onSubmit={handleSubmit}>
        {Object.entries(formErrors).map(([field, error]) => (
          <ErrorLabel key={field} htmlFor={field}>
            {String(error)}
          </ErrorLabel>
        ))}

        <FormGroup>
          <Label htmlFor=''>Plato de comida:</Label>
          {data.platos.map((plato) => (
            <PlateContainer key={plato.id}>
              <input
                type='checkbox'
                id={`plate-${plato.id}`}
                value={plato.id}
                checked={selectedPlates.some((plate) => plate.plateId === plato.id)}
                onChange={() => handlePlateCheckboxChange(plato.id)}
              />
              <label htmlFor={`plate-${plato.id}`}>{plato.nombre}</label>
              {selectedPlates.some((plate) => plate.plateId === plato.id) && (
                <div>
                  <label htmlFor={`quantity-${plato.id}`}>Cantidad:</label>
                  <input
                    type='number'
                    id={`quantity-${plato.id}`}
                    name={`quantity-${plato.id}`}
                    value={selectedPlates.find((plate) => plate.plateId === plato.id)?.quantity || 0}
                    onChange={(e) => handleQuantityChange(plato.id, parseInt(e.target.value))}
                  />
                </div>
              )}
            </PlateContainer>
          ))}
        </FormGroup>
        <FormGroup>
          <Label htmlFor='table'>Número de mesa:</Label>
          <Input type='number' name='table' id='table' />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='comment'>Comentario:</Label>
          <TextArea name='comment' id='comment'></TextArea>
        </FormGroup>
        <BtnGroup>
          <button type='submit'>Enviar</button>
          <LinkStyled to={config.ROUTES.HOME}>Volver al inicio</LinkStyled>
        </BtnGroup>
      </FormContainer>
    </Form>
  );
};

export default AddOrder;
