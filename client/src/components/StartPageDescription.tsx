import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ducky from "../assets/ducky2.png";
import PopularDucks from "./Cards/PopularHats";
import ShowCarousel from "./Carousel";

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
          src={ducky}
          alt=""
        ></img>
        <Typography
          sx={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          }}
        >
          Welcome to Hats on Hats - we got the hats you need.
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
          Do you need a sombrero for a sunny day?, maybe a beavershat for that
          cold cold winter? or why not a tophat for that royal meeting with the
          king of Sweden? Look no further! Hats on Hats got everything you need.
        </Typography>
      </Box>
      <ShowCarousel />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          Browse out our products
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
