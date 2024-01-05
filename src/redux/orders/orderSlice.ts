import { config } from '@/config';
import { IOrder, IOrderWithId } from '@/interface/order.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as data from '@/data/data.json';

const initialState: IOrderWithId[] = (() => {
  const persistedState = localStorage.getItem(config.LOCALSTORAGE.ORDER);
  return persistedState ? JSON.parse(persistedState).orders : data.DEFAULT_STATE;
})();

const updateLocalStorage = (newState: IOrderWithId[]) => {
  localStorage.setItem(config.LOCALSTORAGE.ORDER, JSON.stringify({ orders: newState }));
};

export const orderSlice = createSlice({
  name: config.REDUX_KEY.ORDER,
  initialState,
  reducers: {
    addNewOrder: (state, action: PayloadAction<IOrder>) => {
      const id = crypto.randomUUID();
      const newState = [...state, { id, ...action.payload }];
      localStorage.setItem(config.LOCALSTORAGE.ORDER, JSON.stringify({ orders: newState }));
      return newState;
    },
    editOrder: (state, action: PayloadAction<{ id: string; updatedOrder: IOrder }>) => {
      const { id, updatedOrder } = action.payload;
      const newState = state.map((order) => (order.id === id ? { ...order, ...updatedOrder } : order));
      updateLocalStorage(newState);
      return newState;
    },
    deleteOrderById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newState = state.filter((order) => order.id !== id);
      localStorage.setItem(config.LOCALSTORAGE.ORDER, JSON.stringify({ orders: newState }));
      return newState;
    },
  },
});

export default orderSlice.reducer;
export const { deleteOrderById, addNewOrder, editOrder } = orderSlice.actions;
