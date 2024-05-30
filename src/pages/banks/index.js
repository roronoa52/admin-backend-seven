import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import SAlert from '../../components/Alert';
import { fetchBanks } from '../../redux/banks/action';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/action';

function Banks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const banks = useSelector((state) => state.banks);

  useEffect(() => {
    dispatch(fetchBanks());
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
        const res = await deleteData(`/cms/banks/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus bank ${res.data.data.name}`
          )
        );
        dispatch(fetchBanks());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Banks'} />
        <Button
          className={'mb-3'}
          action={() => navigate('/banks/create')}
        >
          Tambah
        </Button>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={banks.status}
        thead={['Nama', 'Rekening', 'Gambar', 'Aksi']}
        data={banks.data}
        tbody={['name', 'rek', 'image']}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default Banks;