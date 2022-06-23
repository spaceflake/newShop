import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AdminOrderControl from './AdminOrderControl';
import AdminProductControl from './AdminProductControl';
import AdminUserControl from './AdminUserControl';

function AdminPage() {
  const { user } = useUser();
  const [activePage, setActivePage] = useState('products');

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: 'clamp(.85rem, 1vw + .5rem, 1.5rem)',
            }}
          >
            Admin Dashboard
          </Typography>
          {user && (
            <Chip
              avatar={<Avatar>{user.firstName[0] + user.lastName[0]}</Avatar>}
              label={user.email}
              color="default"
              variant="outlined"
            />
          )}
        </Toolbar>
      </AppBar>
      <Link to="/">
        <Button startIcon={<ArrowBackIcon />}>Back to home page</Button>
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
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

      <Box>
        {activePage === 'users' && <AdminUserControl />}
        {activePage === 'products' && <AdminProductControl />}
        {activePage === 'orders' && <AdminOrderControl />}
      </Box>
    </>
  );
}

export default AdminPage;
