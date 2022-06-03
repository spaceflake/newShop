import { Box, Container, Typography } from '@mui/material';
import SignUpForm from '../components/Forms/SignUpForm';

function SignUpPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: '#ffffff',
          mt: 2,
          textAlign: 'center',
          padding: 2,
          minHeight: '50vh',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Sign up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
}

export default SignUpPage;
