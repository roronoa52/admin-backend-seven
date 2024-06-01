import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/bookings';

export function BookingsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
    </Routes>
  );
}