import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Button, createTheme, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material';
import { default as React, FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hatLogo from '../../assets/hatLogo.png';
import { useUser } from '../../contexts/UserContext';
import CartButton from './CartButton';


interface HeaderProps { }

const TabValues: string[] = ["/", "/products", "/about"];

const filteredValue = (value: string) =>
  TabValues.includes(value) ? value : false;

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(filteredValue(useLocation().pathname));

  const currentLocation = filteredValue(useLocation().pathname);
  if (currentLocation !== value) {
    setValue(currentLocation);
  }

  const { user, logout } = useUser();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
      <AppBar sx={{ backgroundColor: 'white', zIndex: 3, }} position="fixed">
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
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem', xl: '3rem' }
              }}>
              Hats On Hats
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              onClick={() => navigate('/products')}
              sx={{
                color: '#181818',
                my: 2,
                display: 'block',
                fontSize: { md: '1rem', lg: '1.3rem' },
              }}
            >
              Products
            </Button>
            <Button
              onClick={() => navigate('/faq')}
              sx={{
                color: '#181818',
                my: 2,
                display: 'block',
                fontSize: { md: '1rem', lg: '1.3rem' },
                margin: { md: '0', lg: '0 1.5rem', xl: '0 4rem' }
              }}
            >
              FAQ
            </Button>
            <Button
              onClick={() => navigate('/support')}
              sx={{
                color: '#181818',
                my: 2,
                display: 'block',
                fontSize: { md: '1rem', lg: '1.3rem' },
              }}
            >
              Support
            </Button>
          </Box>
          {!!user && (
            <Typography sx={{ color: '#181818', mr: '9rem', display: { xs: 'none', lg: 'flex' } }}>
              You are signed in as{!!user?.isAdmin && ' an admin'}: {user?.email}
            </Typography>
          )}
          <Box sx={{ flexGrow: 0, right: '2rem', position: 'absolute' }}>
            <CartButton />
            <Tooltip title={user ? 'Open menu' : 'Log in'}>
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => {
                  if (user) {
                    handleOpenUserMenu(e);
                  } else {
                    navigate('/login');
                  }
                }}>
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
                    {!!user?.isAdmin &&
                      <Button
                        sx={{
                          color: 'black',
                          textAlign: "center",
                          padding: '1rem 2rem'
                        }}
                        onClick={() => {
                          handleCloseUserMenu();
                          navigate('/admin')
                        }}>
                        Admin page
                      </Button>}
                    <Button
                      sx={{
                        color: 'black',
                        textAlign: "center",
                        padding: '1rem 2rem'
                      }}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate('/userpage')
                      }}>
                      Your page
                    </Button>
                    <Button
                      sx={{
                        color: 'black',
                        textAlign: "center",
                        padding: '1rem 2rem'
                      }}
                      onClick={() => {
                        handleCloseUserMenu();
                        logout();
                        navigate('/');
                      }}>
                      Log out
                    </Button>
                  </Box>
                </Menu>
                :
                null
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;