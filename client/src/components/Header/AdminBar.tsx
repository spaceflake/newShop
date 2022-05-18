import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AdminBar() {
  return (
    <Container
      sx={{
        minWidth: '100%',
        margin: 0,
        marginBottom: '0',
        bgcolor: '#00ffe5',
      }}
    >
      <Link to="/admin">
        <Box sx={{ width: '100%', padding: '0.3rem' }}>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'black',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Du är inloggad som administatör - Klicka här för att gå till
            Admin-sidan
          </Typography>
        </Box>
      </Link>
    </Container>
  );
}

export default AdminBar;
