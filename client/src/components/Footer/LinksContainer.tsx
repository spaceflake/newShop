import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import klarna from '../../assets/PaymentLogos/klarna.png';
import swish from '../../assets/PaymentLogos/swish.svg';
import visa from '../../assets/PaymentLogos/visa.png';
import mastercard from '../../assets/PaymentLogos/mastercard.png';
import maestro from '../../assets/PaymentLogos/maestro.png';
import instabox from '../../assets/ShippingLogos/instabox-full.jpg';
import postnord from '../../assets/ShippingLogos/postnord-full.png';
import schenker from '../../assets/ShippingLogos/schenker-full.png';
import SubscribeForm from '../Forms/SubscribeForm';
import duckLogo from '../../assets/ducky2.png';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#1a237e',
    },
  },
  typography: {
    fontSize: 15,
  },
});

const iconSize = createTheme({
  palette: {
    secondary: {
      main: '#ec407a',
    },
    primary: {
      main: '#3d5afe',
    },
  },
  typography: {
    fontSize: 22,
  },
});

function LinksContainer() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ margin: 'auto', width: '90%', padding: '3rem 0' }}
    >
      <Grid
        item
        xs={12}
        md={3}
        lg={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={duckLogo} width="200" height="200" alt=""></img>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        lg={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6">
            Hjälp
          </Typography>
          <ThemeProvider theme={theme}>
            <Typography gutterBottom>
              <Link to="faq">
                <Button color="secondary" variant="text">
                  Vanliga frågor
                </Button>
              </Link>
            </Typography>
            <Typography gutterBottom>
              <Link to="termsOfUse">
                <Button color="secondary" variant="text">
                  Användarvillkor
                </Button>
              </Link>
            </Typography>
            <Typography>
              <Link to="support">
                <Button color="secondary" variant="text">
                  Kundtjänst
                </Button>
              </Link>
            </Typography>
          </ThemeProvider>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        lg={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography gutterBottom variant="h6">
            Följ oss
          </Typography>
          <ThemeProvider theme={iconSize}>
            <FacebookOutlinedIcon color="primary" fontSize="large" />
            <InstagramIcon color="secondary" fontSize="large" />
          </ThemeProvider>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        lg={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box>
          <SubscribeForm />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <img width="75" src={klarna} alt=""></img>
          <img width="75" src={swish} alt=""></img>
          <img width="75" src={visa} alt=""></img>
          <img width="75" src={maestro} alt=""></img>
          <img width="75" src={mastercard} alt=""></img>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img width="100" src={instabox} alt=""></img>
          <img width="100" src={postnord} alt=""></img>
          <img width="90" src={schenker} alt=""></img>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LinksContainer;
