import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Button, Container, createTheme, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hatLogo from '../../assets/hatLogo.png';
import { useUser } from '../../contexts/UserContext';
import AdminBar from './AdminBar';


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
                onClick={handleCloseNavMenu}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                Products
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                FAQ
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ color: '#181818', my: 2, display: 'block' }}
              >
                About us
              </Button>
            </Box>
            {!!user && (
              <Typography sx={{ color: '#181818', mr: '1rem', display: { xs: 'none', md: 'flex' } }}>
                You are signed in as: {user?.email}
              </Typography>
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              {/* Add conditional rendering checksing if user logged in */}
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
                {
                  user ?
                    <>
                      <MenuItem >
                        <Link style={{ color: 'black', textAlign: "center" }} to='/settings' onClick={handleCloseUserMenu}>settings</Link>
                      </MenuItem>
                      <MenuItem >
                        <Link style={{ color: 'black', textAlign: "center" }} to='/' onClick={() => {handleCloseUserMenu(); logout() }}>Log out</Link>
                      </MenuItem>
                    </>
                    :
                    <>
                      <MenuItem >
                        <Link style={{ color: 'black', textAlign: "center" }} to='/login' onClick={handleCloseUserMenu}>Log in</Link>
                      </MenuItem>
                      <MenuItem >
                        <Link style={{ color: 'black', textAlign: "center" }} to='/signup' onClick={handleCloseUserMenu}>Sign up</Link>
                      </MenuItem>
                    </>
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

/*  

      <Container maxWidth="md" sx={{ padding: '0,2rem', mb: 1, mt: 2 }}>
        <Box sx={{ width: '100%' }}>
          {!!user && (
            <Typography sx={{ color: '#c900c1' }}>
              Du är nu inloggad som: {user?.email}
            </Typography>
          )}
        </Box>

        <Typography>Hats On Hats</Typography>

        <Button onClick={handleDrawerOpen}>
          <AccountCircleIcon
            sx={{
              height: '2.5rem',
              width: '2.5rem',
              color: "#5B5B5B"
            }}
          />
        </Button>

        <Drawer
          sx={{
            position: 'absolute',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              marginTop: '4rem',
              backgroundColor: 'white',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}>
        </Drawer> */

/* <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }}
>
  <Tabs
    sx={{
      '@media screen and (max-width: 440px)': {
        padding: '0',
        marginLeft: '-25px',
      },
    }}
    value={value}
    onChange={handleChange}
    textColor="primary"
    indicatorColor="primary"
    aria-label="secondary tabs example"
  >
    <Tab value="/" label="Hem" />
    <Tab value="/products" label="Produkter" />
  </Tabs>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      '@media screen and (max-width: 480px)': {
        marginRight: '-10px',
      },
    }}
  >
    {!user ? (
      <>
        <Link to="/login">
          <Button
            sx={{
              bgcolor: 'white',
              border: 'none',
              color: ' black',
              minWidth: '1px',
              '&:hover': {
                bgcolor: '#dadcd9',
                border: 'none',
                color: ' black',
              },
              '@media screen and (max-width: 480px)': {
                fontSize: '0',
                padding: '0',
                bgcolor: 'transparent',
                textalign: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              },
            }}
            variant="outlined"
            endIcon={
              <AccountCircleIcon
                sx={{
                  padding: '0',
                  height: '2.5rem',
                  width: '2.5rem',
                  '@media screen and (max-width: 440px)': {
                    marginRight: '-30px',
                  },
                }}
                color="warning"
              />
            }
          >
            Logga in
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            sx={{
              bgcolor: 'white',
              border: 'none',
              color: ' black',
              minWidth: '1px',
              '&:hover': {
                bgcolor: '#dadcd9',
                border: 'none',
                color: ' black',
              },
              '@media screen and (max-width: 480px)': {
                fontSize: '0',
                padding: '0',
                bgcolor: 'transparent',
                textalign: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              },
            }}
            variant="outlined"
            endIcon={
              <AccountCircleIcon
                sx={{
                  padding: '0',
                  height: '2.5rem',
                  width: '2.5rem',
                  '@media screen and (max-width: 440px)': {
                    marginRight: '-30px',
                  },
                }}
                color="warning"
              />
            }
          >
            Sign up
          </Button>
        </Link>
      </>
    ) : (
      <Button
        sx={{
          bgcolor: 'white',
          border: 'none',
          color: ' black',
          minWidth: '1px',
          '&:hover': {
            bgcolor: '#dadcd9',
            border: 'none',
            color: ' black',
          },
          '@media screen and (max-width: 480px)': {
            fontSize: '0',
            padding: '0',
            bgcolor: 'transparent',
            textalign: 'none',
            '&:hover': {
              bgcolor: 'transparent',
            },
          },
        }}
        variant="outlined"
        endIcon={
          <AccountCircleIcon
            sx={{
              padding: '0',
              height: '2.5rem',
              width: '2.5rem',
              '@media screen and (max-width: 440px)': {
                marginRight: '-30px',
              },
            }}
            color="success"
          />
        }
        onClick={() => logout()}
      >
        Logga ut
      </Button>
    )}

    <CartButton />
  </Box>
</Box> */