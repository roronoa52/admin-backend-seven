import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavAccess';
import { useNavigate } from 'react-router-dom';

function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Dashboard</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink
            action={() => navigate('/')}
          >
            Home
          </NavLink>
          <NavLink
            action={() => navigate('/banks')}
          >
            Bank
          </NavLink>
          <NavLink
            action={() => navigate('/products')}
          >
            Product
          </NavLink>
          <NavLink
            action={() => navigate('/bookings')}
          >
            Booking
          </NavLink>
          <NavLink
            action={() => navigate('/history')}
          >
            Booking History
          </NavLink>
        </Nav>
        <Nav className='justify-content-end'>
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SNavbar;