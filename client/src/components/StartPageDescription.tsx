import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import PopularDucks from './Cards/PopularDucks';
import ShowCarousel from './Carousel';

function StartPageDesription() {
  return (
    <Box
      sx={{
        width: '90%',
        height: 'fitContent',
        background: '#ffffff',
        marginInline: 'auto',
      }}
    >
      <ShowCarousel />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            paddingTop: '1rem',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          }}
        >
          Welcome to Hats on Hats, we got the hats you need!
        </Typography>
      </Box>
      <Box
        sx={{
          width: '70%',
          textAlign: 'center',
          margin: 'auto',
          paddingTop: '1rem',
          paddingBottom: '2rem',
        }}
      >
        <Typography sx={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>
          Here at Hats on Hats we got hats for everyone!
          {<br />}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
          accusamus quod neque. Fugit qui, maiores nostrum ratione ipsam quidem
          obcaecati culpa itaque iusto, ut numquam incidunt, ex aperiam. Beatae,
          ullam.
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'left', marginTop: '5vw' }}>
        <Typography
          sx={{ marginBottom: '2rem', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
        >
          Our popular products
        </Typography>
        <PopularDucks />
        <Link to="products">
          <Button
            sx={{
              mt: 2,
              mb: 2,
              height: '3rem',
              bgcolor: '#ED6C02',
              border: 'none',
              color: ' white',
              '&:hover': {
                bgcolor: '#181818',
                color: 'white',
              },
            }}
            variant="outlined"
          >
            Show all products
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default StartPageDesription;
