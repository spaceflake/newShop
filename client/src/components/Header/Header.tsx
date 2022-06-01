import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Button, Container, createTheme, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hatLogo from '../../assets/hatLogo.png';
import { useUser } from '../../contexts/UserContext';
import AdminBar from './AdminBar';
import CartButton from './CartButton';


interface HeaderProps { }

const TabValues: string[] = ['/', '/products', '/about'];

const filteredValue = (value: string) =>
  TabValues.includes(value) ? value : false;

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(filteredValue(useLocation().pathname));

  const currentLocation = filteredValue(useLocation().pathname);
  if (currentLocation !== value) {
    setValue(currentLocation);
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const { user, logout } = useUser();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Cormorant SC',
        'serif',
      ].join(','),
    },
  });


  return (
    <>
      {!!user?.isAdmin && <AdminBar />}
      <AppBar sx={{ backgroundColor: '#D4E09B' }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Link
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#181818',
                margin: '0 1rem'
              }}
              to={"/"}>
              <Box
                component="img"
                alt='Logo'
                src={hatLogo}
                sx={{
                  mr: 2,
                  width: '4.5rem',
                  display: { xs: 'none', md: 'flex' },
                }}
              />
              <Typography variant='h3'>Hats On Hats</Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => navigate('/products')}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                Products
              </Button>
              <Button
                onClick={() => navigate('/faq')}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                FAQ
              </Button>
              <Button
                onClick={() => navigate('/support')}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                Support
              </Button>
            </Box>
            {!!user && (
              <Typography sx={{ color: '#181818', mr: '1rem', display: { xs: 'none', md: 'flex' } }}>
                You are signed in as: {user?.email}
              </Typography>
            )}
            <CartButton />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={user ? 'Open menu' : 'Log in'}>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={(e) => {
                    if (user) {
                      handleOpenUserMenu(e);
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      padding: '0',
                      height: '2.5rem',
                      width: '2.5rem',
                      color: "#181818",
                      '@media screen and (max-width: 440px)': {
                        marginRight: '-30px',
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
              {
                user ?
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Button sx={{ color: 'black', textAlign: "center", padding: '1rem 2rem' }} onClick={() => { handleCloseUserMenu(); navigate('/settings') }}>settings</Button>
                      <Button sx={{ color: 'black', textAlign: "center", padding: '1rem 2rem' }} onClick={() => { handleCloseUserMenu(); logout(); navigate('/') }}>Log out</Button>
                    </Box>
                  </Menu>
                  :
                  null
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;