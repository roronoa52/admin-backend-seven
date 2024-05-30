import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Login from '../pages/signin';
import SNavbar from '../components/Navbar';
import { HomeRoute } from './HomeRoute';
import { BanksRoute } from './BanksRoute';
import { ProductsRoute } from './ProductsRoute';
import { PaymentsRoute } from './PaymentsRoute';

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
        <Route path='bookings/*' element={<PaymentsRoute />} />
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  );
}