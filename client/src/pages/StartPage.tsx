//import CategoriesCard from '../components/Cards/CategoriesCard';
import { Box } from '@mui/material';
import CategoriesCard from '../components/Cards/CategoriesCard';
import StartPageDesription from '../components/StartPageDescription';

function StartPage() {
  return (
    <Box>
      <StartPageDesription />
      <CategoriesCard />
    </Box>
  );
}

export default StartPage;
