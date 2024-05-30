import { Route, Routes } from 'react-router-dom';

import Banks from '../pages/banks';
import Create from '../pages/banks/create';

export function BanksRoute() {
  return (
    <Routes>
      <Route path='/' element={<Banks />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  );
}