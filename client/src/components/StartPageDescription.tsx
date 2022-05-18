import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ducky from "../assets/ducky2.png";
import PopularDucks from "./Cards/PopularDucks";
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
          Välkommen till Ducky - affären där du köper dina badankor
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
          Håll humöret flytande med hjälp av våra osänkbara badankor! Badankor
          är levnadsglada filurer med truten formad som ett naturligt leende. Vi
          på Ducky har också lagt näbben i blöt och våra efterforskningar ger
          starka belägg för att det är svårt att sura när du ser en badanka i
          ögonen. Badankor bör därför inte saknas i badrummet och alla våra
          badankor har riktigt starka personligheter
        </Typography>
      </Box>
      <ShowCarousel />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
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
