import { useOrderActions } from '@/hooks/useOrderActions';
import { EStatus, IOrder } from '@/interface/order.interface';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as data from '../../data/data.json';
import { IPlate } from '../../interface/order.interface';

const Form = styled.div`
  display: flex;
  margin: 5% auto;
  height: 100%;
  justify-content: center;
  align-items: center;

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  label {
    display: block;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 20rem;
`;

const PlateContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  margin-bottom: 0.625rem;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  resize: none;
`;

const LinkStyled = styled(Link)`
  background-color: #f44336;
  color: white;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
  text-decoration: none;
`;

const BtnGroup = styled.div`
  display: grid;
  gap: 1rem;
`;

const ErrorLabel = styled.label`
  background-color: red;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-align: center;
  padding: 0.25rem 0;
`;

interface ICheckDate {
  plateId: number;
  quantity: number;
}

const AddOrder = () => {
  const [selectedPlates, setSelectedPlates] = React.useState<ICheckDate[]>([]);
  const [formErrors, setFormErrors] = React.useState({});
  const history = useNavigate();

  const { addOrder } = useOrderActions();

  const handlePlateCheckboxChange = (plateId) => {
    setSelectedPlates((prevSelected) => {
      const existingIndex = prevSelected.findIndex((plate) => plate.plateId === plateId);

      if (existingIndex !== -1) {
        const updatedSelected = [...prevSelected];
        updatedSelected.splice(existingIndex, 1);
        return updatedSelected;
      } else {
        return [...prevSelected, { plateId, quantity: 1 }];
      }
    });
  };
  const handleQuantityChange = (plateId, newQuantity) => {
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

    const selectedPlatesData = selectedPlates.map((plate) => ({
      plateId: plate.plateId,
      quantity: plate.quantity,
    }));

    const newFormErrors = {};

    if (selectedPlates.length === 0) {
      newFormErrors['plates'] = 'Selecciona al menos un plato';
    }
    for (const plate of selectedPlates) {
      if (plate.quantity <= 0) {
        newFormErrors[`quantity-${plate.plateId}`] = `La cantidad de ${plate.plateId} debe ser mayor que cero`;
      }
    }

    const formData = new FormData(e.currentTarget);
    const table = parseInt(formData.get('table')?.toString().trim() ?? '');

    if (!table) {
      newFormErrors['table'] = 'Ingresa un número de mesa válido';
    }

    const comment = formData.get('comment')?.toString().trim() as string;

    if (!comment) {
      newFormErrors['comment'] = 'Ingresa un comentario';
    }

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length > 0) {
      return;
    }

    const plates = selectedPlatesData.map<IPlate>((plate) => ({
      quantity: plate.quantity,
      name: data.platos.find((plato) => plato.id === plate.plateId)?.nombre as string,
      ingredients: data.platos.find((plato) => plato.id === plate.plateId)?.ingredientes.map((data) => data) || [],
    }));

    const orderObject: IOrder = {
      // id: uuidv4(),
      plate: [...plates],
      status: EStatus.PENDIENTE,
      table,
      waiter: 'Marcos Alanya',
      comment,
    };

    addOrder(orderObject);

    if (Object.keys(newFormErrors).length === 0) {
      // Redirigir a '/'
      history('/');

      // Resetear el formulario
      e.currentTarget.reset();
    }
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
          <Input type='text' name='table' id='table' />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='comment'>Comentario:</Label>
          <TextArea name='comment' id='comment'></TextArea>
        </FormGroup>
        <BtnGroup>
          <button type='submit'>Enviar</button>
          <LinkStyled to={'/'}>Volver al inicio</LinkStyled>
        </BtnGroup>
      </FormContainer>
    </Form>
  );
};

export default AddOrder;
