import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import hatsonhatslogo from "../assets/hatsonhatslogo.png";
import PopularDucks from "./Cards/PopularDucks";
import ShowCarousel from "./Carousel";

function StartPageDesription() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "fitContent",
        background: "#ffffff",
        paddingTop: "0.5rem",
      }}
    >
      <Box
        sx={{
          paddingLeft: "1rem",
          display: "flex",
          justifyContent: "left",
          "@media screen and (max-width: 480px)": {
            flexDirection: "column",
          },
        }}
      >
        <img
          style={{
            width: "6rem",
          }}
          src={hatsonhatslogo}
          alt=""
        ></img>
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
          Letar du efter en fedora som skyddar dig från solen?, kanske en
          stickad mössa som håller dig varm på vintern? eller varför inte en
          stilig tophat för ditt möte med kungen? Då behöver du inte leta
          längre, för Hats on Hats har allt just för dig!
        </Typography>
      </Box>
      <ShowCarousel />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ marginBottom: "1rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          Se våra produkter
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
            Visa alla produkter
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default StartPageDesription;
