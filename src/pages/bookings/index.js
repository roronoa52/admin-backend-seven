// PaymentsPage.js

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, setKeyword } from '../../redux/bookings/action';
import SAlert from '../../components/Alert';
import { putData } from '../../utils/fetch';
import SearchInput from '../../components/SearchInput';

function PaymentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch, bookings.keyword]);

  const handleReject = async (id) => {

    console.log(id)

    try {
      await putData(`/cms/bookings/${id}`, { status: "ditolak" });

      dispatch(fetchBookings())
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const handleSuccess = async (id) => {
    try {
      await putData(`/cms/bookings/${id}`, { status: "berhasil" });
      dispatch(fetchBookings())
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Bookings'} />

        <Button className={'mb-3'} action={() => navigate('/bookings/create')}>
          Tambah
        </Button>

        <SearchInput
        query={bookings.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      

      <Table
        status={bookings.status}
        thead={['Firstname', 'Middlename','Lastname', 'Total', 'Status', 'Avatar', 'Product', 'Start Date', 'End Date', 'Aksi']}
        data={bookings.data}
        tbody={['firstName', 'middleName', 'lastName', 'total', 'status', 'image', 'product', 'startDate', 'endDate']}
        handleReject={handleReject}
        handleSuccess={handleSuccess}
        withoutPagination
      />
    </Container>
  );
}

export default PaymentsPage;
