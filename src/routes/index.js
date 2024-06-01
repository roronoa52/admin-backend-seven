import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Login from '../pages/signin';
import SNavbar from '../components/Navbar';
import { HomeRoute } from './HomeRoute';
import { BanksRoute } from './BanksRoute';
import { ProductsRoute } from './ProductsRoute';
import { BookingsRoute } from './BookingsRoute';
import { HistoryBookingsRoute } from './HistoryBookings';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='login'
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
        />
      <Route
        path='/'
        element={
          <>
            <SNavbar />
            <GuardRoute />
            </>
          }
        >
        <Route path='dashboard/*' element={<HomeRoute />} />
        <Route path='products/*' element={<ProductsRoute />} />
        <Route path='banks/*' element={<BanksRoute />} />
        <Route path='bookings/*' element={<BookingsRoute />} />
        <Route path='history/*' element={<HistoryBookingsRoute />} />
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  );
}