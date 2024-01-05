import styled from 'styled-components';
import Header from './components/Header/Header';
import AddOrder from './pages/AddOrder/AddOrder';
import Home from './pages/Home/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const ContainerStyled = styled.div`
  background-color: #e7edea;
  min-height: 100vw;
`

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ContainerStyled>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/nueva-orden' element={<AddOrder />} />
          {/* <Route path='/productos/nuevo' element={<NuevoProducto />} /> */}
          {/* <Route path='/productos/editar/:id' element={<NuevoProducto />} /> */}
        </Routes>
      </ContainerStyled>
    </BrowserRouter>
  );
}

export default App;
