import { Route, Routes } from 'react-router-dom';

import History from '../pages/history';

export function HistoryBookingsRoute() {
  return (
    <Routes>
      <Route path='/' element={<History />} />
    </Routes>
  );
}