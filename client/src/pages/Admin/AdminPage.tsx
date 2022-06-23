import { AccountCircle } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AdminOrderControl from './AdminOrderControl';
import AdminProductControl from './AdminProductControl';
import AdminUserControl from './AdminUserControl';

function AdminPage() {
  const { user } = useUser();
  const [activePage, setActivePage] = useState('products');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
