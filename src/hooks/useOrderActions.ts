import { IOrder } from '@/interface/order.interface';
import { addNewOrder, deleteOrderById, editOrder } from '@/redux/orders/orderSlice';
import { useAppDispatch } from './store';

export const useOrderActions = () => {
  const dispatch = useAppDispatch();

  const addOrder = (order: IOrder) => {
    dispatch(addNewOrder(order));
  };

  const updateOrder = (id: string, updatedOrder: IOrder) => {
    dispatch(editOrder({ id, updatedOrder }));
  };

  const removeOrder = (id: string) => {
    dispatch(deleteOrderById(id));
  };

  return { removeOrder, addOrder, updateOrder };
};
