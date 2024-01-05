import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import './index.css';
import { store } from './redux/store.tsx';
import { theme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
