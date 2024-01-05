import Header from './components/Header/Header';
import AddOrder from './pages/AddOrder/AddOrder';
import Home from './pages/Home/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/nueva-orden' element={<AddOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
