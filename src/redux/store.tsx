import { config } from '@/config.ts';
import { Middleware, configureStore } from '@reduxjs/toolkit';
import ordersReducer from './orders/orderSlice.ts';

const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem(config.LOCALSTORAGE.ORDER, JSON.stringify(store.getState()));
};

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistenceLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
