import AdminProductControl from './AdminProductControl';
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container/Container';
import AdminUserControl from './AdminUserControl';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminOrderControl from './AdminOrderControl';

function AdminPage() {
  const [activePage, setActivePage] = useState('products');

  return (
    <>
      <Container maxWidth="lg">
        <Link to="/">
          <Button startIcon={<ArrowBackIcon />}>Back to home page</Button>
        </Link>
        <Box
          sx={{
            display: 'flex',
            margin: '1rem',
            gap: '1rem',
          }}
        >
          <Button variant="contained" onClick={() => setActivePage('users')}>
            Users
          </Button>

          <Button variant="contained" onClick={() => setActivePage('products')}>
            Products
          </Button>

          <Button variant="contained" onClick={() => setActivePage('orders')}>
            Orders
          </Button>
        </Box>
      </Container>
      {activePage === 'users' && <AdminUserControl />}
      {activePage === 'products' && <AdminProductControl />}
      {activePage === 'orders' && <AdminOrderControl />}
    </>
  );
}

export default AdminPage;
