import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import hatLogo from '../assets/hatLogo.png';
import PopularDucks from './Cards/PopularDucks';
import ShowCarousel from './Carousel';

function StartPageDesription() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "fitContent",
        background: "#ffffff",
        paddingTop: "2rem",
      }}
    >
      <ShowCarousel />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media screen and (max-width: 480px)": {
            flexDirection: "column",
          },
        }}
      >
        <img
          style={{
            width: "10rem",
          }}
          src={hatLogo}
          alt="logo"
        ></img>
        <Typography
          sx={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          }}
        >
          Welcome to Hats on Hats, we got the hats you need!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "70%",
          textAlign: "center",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Typography sx={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}>
          Here at Hats on Hats we got hats for everyone!
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          See our products
        </Typography>
        <PopularDucks />
        <Link to="products">
          <Button
            sx={{
              mt: 2,
              mb: 2,
              height: "3rem",
              bgcolor: "#0EDFE6",
              border: "none",
              color: " black",
              "&:hover": {
                bgcolor: "#eaa0ff",
                border: "none",
                color: "black",
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
