// PaymentsPage.js

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/bookings/action';
import SAlert from '../../components/Alert';
import { putData } from '../../utils/fetch'; // Import putData function for making PUT requests

function PaymentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleReject = async (id) => {
    try {
      await putData(`/products/${id}`, { status: "ditolak" }); // Send PUT request to change status to "ditolak"
      // Optionally, you can perform additional actions after the status is updated
      // For example, refetch the data or show a success message
    } catch (error) {
      console.error("Error rejecting booking:", error);
      // Handle error here, show an error message or perform other actions
    }
  };

  console.log(bookings.data);

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Bookings'} />

        <Button className={'mb-3'} action={() => navigate('/bookings/create')}>
          Tambah
        </Button>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}


      <Table
        status={bookings.status}
        thead={['Firstname', 'Middlename','Lastname', 'Total', 'Status', 'Avatar', 'Product', 'Start Date', 'End Date', 'Aksi']}
        data={bookings.data}
        tbody={['firstName', 'middleName', 'lastName', 'total', 'status', 'image', 'product', 'startDate', 'endDate']}
        handleReject={handleReject} // Pass handleReject function as prop
        withoutPagination
      />
    </Container>
  );
}

export default PaymentsPage;
