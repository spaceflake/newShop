import { Box, Container, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm";

function LoginPage() {
  return (
    <Container maxWidth="md" >
      <Box sx={{ bgcolor: "#ffffff", mt: 2, textAlign:"center", padding:2, minHeight:"50vh"}}>
        <Typography variant="h5" sx={{fontWeight: "bold", mb:3 }}>
          Logga in
        </Typography>

        {/* Log in form with username and password */}
        <LoginForm />

        {/* just for development, remove before "real" launch. */}
        <Box >
          <Typography variant="body1" sx={{ mt:5,fontWeight: "bold" }}>
            To log in as admin; <br />
            Username: Admin-User password: Admin
            <br />
            To log in as user;
            <br />
            Username: Regular-User password: User
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
