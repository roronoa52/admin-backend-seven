import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTalents, setKeyword } from '../../redux/products/action';
import AlertMessage from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/action';

function TalentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.notif);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, products.keyword]);

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
        const res = await deleteData(`/cms/products/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecound={'Products'} />
        <div className='mb-3'>
          <Button action={() => navigate('/products/create')}>Tambah</Button>
        </div>
      <SearchInput
        query={products.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={products.status}
        thead={['Nama', 'Price', 'Image', 'Aksi']}
        data={products.data}
        tbody={['name', 'price', 'image']}
        editUrl={`/products/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default TalentsPage;