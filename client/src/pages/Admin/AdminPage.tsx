import { AccountCircle } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
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
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            {user && (
              <div>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ flexGrow: 1 }}
                >
                  {user.email}
                </Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Link to="/">
          <Button startIcon={<ArrowBackIcon />}>Back to home page</Button>
        </Link>
        <Grid container>
          <Grid item gridColumn="span 2">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem',
                gap: '1rem',
              }}
            >
              <Button
                variant="contained"
                onClick={() => setActivePage('users')}
              >
                Users
              </Button>

              <Button
                variant="contained"
                onClick={() => setActivePage('products')}
              >
                Products
              </Button>

              <Button
                variant="contained"
                onClick={() => setActivePage('orders')}
              >
                Orders
              </Button>
            </Box>
          </Grid>
          <Grid item lg>
            <Box>
              {activePage === 'users' && <AdminUserControl />}
              {activePage === 'products' && <AdminProductControl />}
              {activePage === 'orders' && <AdminOrderControl />}
            </Box>
          </Grid>
        </Grid>
      </>
    </>
  );
}

export default AdminPage;
