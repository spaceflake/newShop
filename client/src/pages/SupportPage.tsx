import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import duckyComputer from "../assets/duckyComputer.webp";

function SupportPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: "#c7f0e1",
          textAlign: "center",
          mt: 2,
          padding: 3,
          minHeight: "40vh",
        }}
      >
        <Typography gutterBottom variant="h4">
          Support
        </Typography>
        <Typography gutterBottom variant="h6">
          Answer to our FAQ do you find <Link to="/faq">here</Link>
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          If you don't find your answer you're looking for you can always
          contact us
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Phone support 0700-000000
        </Typography>
        <Typography gutterBottom variant="subtitle2">
          Weekdays 08:00-17:00
        </Typography>
        <Typography variant="subtitle1">
          Mailsupport hatsonhats@hatmail.com
        </Typography>
        <img
          style={{ borderRadius: "20rem", marginTop: "5rem" }}
          width="250"
          height="250"
          src={duckyComputer}
          alt=""
        ></img>
      </Box>
    </Container>
  );
}

export default SupportPage;
