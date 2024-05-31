import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/bookings/action';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/action';

function PaymentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/bookings/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus kategori ${res.data.data.type}`
          )
        );

        dispatch(fetchBookings());
      }
    });
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
        thead={['firstname', 'middlename', 'Avatar', 'Aksi']}
        data={bookings.data}
        tbody={['firstName', 'status', 'status', 'status', 'avatar']}
        editUrl={`/bookings/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default PaymentsPage;