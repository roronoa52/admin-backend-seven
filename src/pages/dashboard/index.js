import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SBreadCrumb from '../../components/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory } from '../../redux/history/action';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const dispatch = useDispatch();

  const history = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  // Extracting data for the chart
  const dates = history.data.map(item => moment(item.startDate).format('YYYY-MM-DD'));
  const uniqueDates = [...new Set(dates)];

  const totalsPerDate = uniqueDates.map(date => {
    return history.data
      .filter(item => moment(item.startDate).format('YYYY-MM-DD') === date)
      .reduce((total, item) => total + item.total, 0);
  });

  const statusCountsPerDate = uniqueDates.map(date => {
    const successCount = history.data.filter(item => moment(item.startDate).format('YYYY-MM-DD') === date && item.status === 'berhasil').length;
    const failedCount = history.data.filter(item => moment(item.startDate).format('YYYY-MM-DD') === date && item.status === 'ditolak').length;
    return { success: successCount, failed: failedCount };
  });

  const totalData = {
    labels: uniqueDates,
    datasets: [
      {
        label: 'Total Payments per Day',
        data: totalsPerDate,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: uniqueDates,
    datasets: [
      {
        label: 'Successful Transactions',
        data: statusCountsPerDate.map(item => item.success),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Failed Transactions',
        data: statusCountsPerDate.map(item => item.failed),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Payment History Statistics by Date',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb />
      <h1>Dashboard</h1>

      <Row>
        <Col md={6}>
          <Bar data={totalData} options={options} />
        </Col>
        <Col md={6}>
          <Bar data={statusData} options={options} />
        </Col>
      </Row>
    </Container>
  );
}
