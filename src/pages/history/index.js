// PaymentsPage.js

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory, setKeyword } from '../../redux/history/action';
import SAlert from '../../components/Alert';
import { putData } from '../../utils/fetch';
import SearchInput from '../../components/SearchInput';

function HistoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const history = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch, history.keyword]);

  const handleReject = async (id) => {

    console.log(id)

    try {
      await putData(`/cms/historyhistory/${id}`, { status: "ditolak" });

      dispatch(fetchHistory())
    } catch (error) {
      console.error("Error rejecting history:", error);
    }
  };

  const handleSuccess = async (id) => {
    try {
      await putData(`/cms/historybookings/${id}`, { status: "berhasil" });
      dispatch(fetchHistory())
    } catch (error) {
      console.error("Error rejecting history:", error);
    }
  };

  console.log(history.data)

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'History'} />
        <SearchInput
        query={history.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      
      <Table
        status={history.status}
        thead={['Firstname', 'Middlename', 'Lastname', 'Total', 'Status', 'Admin', 'Avatar', 'Product', 'Start Date', 'End Date']}
        data={history.data}
        tbody={['firstName', 'middleName', 'lastName', 'total', 'status', 'admin', 'image', 'product', 'startDate', 'endDate']}
        withoutPagination
      />
    </Container>
  );
}

export default HistoryPage;
