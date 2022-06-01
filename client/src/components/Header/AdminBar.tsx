import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function AdminBar() {
  return (
    <Container
      sx={{
        position: 'fixed',
        zIndex: 3,
        minWidth: "100%",
        margin: 0,
        marginBottom: "1rem",
        bgcolor: "#00ffe5",
      }}
    >
      <Link to="/admin">
        <Box sx={{ width: "100%", padding: "0.3rem" }}>
          <Typography
            sx={{
              textAlign: "center",
              color: "black",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            You are logged in as admin - Click here to go to Admin page
          </Typography>
        </Box>
      </Link>
    </Container>
  );
}

export default AdminBar;
