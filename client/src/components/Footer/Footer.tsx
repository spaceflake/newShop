import { Box } from '@mui/material';
import LinksContainer from './LinksContainer';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#c4dbf2',
        width: '100%',
        height: 'fit-content',
        marginTop: '2rem',
      }}
    >
      <LinksContainer />
    </Box>
  );
}

export default Footer;
