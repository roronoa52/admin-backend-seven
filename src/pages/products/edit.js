import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/action';

function ProductsEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    price: 0,
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneProducts = async () => {
    const res = await getData(`/cms/products/${productId}`);

    setForm({
      ...form,
      name: res.data.data.name,
      price: res.data.data.price,
      avatar: res.data.data.image.name,
      file: res.data.data.image._id,
      dataImage:res.data.data.image.dataImage,
      typeImage:res.data.data.image.typeImage,
    });
  };

  useEffect(() => {
    fetchOneProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name: form.name,
      price: form.price,
      image: form.file,
    };

    const res = await putData(`/cms/products/${productId}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, 'success', `berhasil ${res.data.data.name}`)
      );
      navigate('/products');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.data.data.name,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound={'Products'}
        urlSecound={'/products'}
        textThird='Edit'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
}

export default ProductsEdit;