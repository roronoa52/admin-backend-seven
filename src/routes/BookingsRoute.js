import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/bookings';
import Create from '../pages/bookings/create';
import Edit from '../pages/bookings/edit';

export function BookingsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:bookingId' element={<Edit />} />
    </Routes>
  );
}