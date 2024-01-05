import React from 'react';
import * as data from '../../data/data.json';
import { EStatus, IOrderWithId } from '@/interface/order.interface';
import { IPlate } from '../../interface/order.interface';
import { v4 as uuidv4 } from 'uuid';
import { useOrderActions } from '@/hooks/useOrderActions';

interface ICheckDate {
  plateId: number;
  quantity: number;
}

const AddOrder = () => {
  const [selectedPlates, setSelectedPlates] = React.useState<ICheckDate[]>([]);

  const { addOrder } = useOrderActions();

  const handlePlateCheckboxChange = (plateId) => {
    setSelectedPlates((prevSelected) => {
      const existingIndex = prevSelected.findIndex((plate) => plate.plateId === plateId);

      if (existingIndex !== -1) {
        const updatedSelected = [...prevSelected];
        updatedSelected[existingIndex] = { plateId, quantity: updatedSelected[existingIndex].quantity + 1 };
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

    const form = e.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get('comment') as string;

    const test = selectedPlatesData.map<IPlate>((plate) => ({
      quantity: plate.quantity,
      name: data.platos.find((plato) => plato.id === plate.plateId)?.nombre as string,
      ingredients: data.platos.find((plato) => plato.id === plate.plateId)?.ingredientes.map((data) => data) || [],
    }));

    const orderObject: IOrderWithId = {
      id: uuidv4(),
      plate: [...test],
      status: EStatus.PENDIENTE,
      table: 54,
      waiter: 'Marcos Alanya',
      comment,
    };

    addOrder(orderObject);

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Plato de comida:</label>
        {data.platos.map((plato) => (
          <div key={plato.id}>
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
          </div>
        ))}
        <label htmlFor='comment'>Comentario:</label>
        <textarea name='comment' id='comment'></textarea>
        <button type='submit'>Enviar</button>
      </form>
    </>
  );
};

export default AddOrder;
