export const validateSelectedPlates = (selectedPlates) => {
  const errors = {};

  if (selectedPlates.length === 0) {
    errors['plates'] = 'Selecciona al menos un plato';
  }

  for (const plate of selectedPlates) {
    if (plate.quantity <= 0) {
      errors[`quantity-${plate.plateId}`] = `La cantidad de ${plate.plateId} debe ser mayor que cero`;
    }
  }

  return errors;
};

export const validateTable = (table) => {
  if (!table) {
    return { table: 'Ingresa un número de mesa válido' };
  }
  return {};
};

export const validateComment = (comment) => {
  if (!comment) {
    return { comment: 'Ingresa un comentario' };
  }
  return {};
};

export const createPlateObject = (selectedPlatesData, data) => {
  return selectedPlatesData.map((plate) => ({
    quantity: plate.quantity,
    name: data.platos.find((plato) => plato.id === plate.plateId)?.nombre as string,
    ingredients: data.platos.find((plato) => plato.id === plate.plateId)?.ingredientes.map((data) => data) || [],
  }));
};
