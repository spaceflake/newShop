import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Categories } from '../../Api/Data';
import { useProduct } from '../../contexts/ProductsContext';

function CategoriesCard() {
  const { products } = useProduct();
  const displayCategories = Categories.filter(
    (c) => c !== 'Övriga' && products.findIndex((p) => p.category === c) >= 0
  );

  displayCategories.splice(Math.min(displayCategories.length, 3));
  const categoryImages = displayCategories.map(
    (c) => products.find((p) => p.category === c)?.imgURL
  );

  return (
    <Container sx={{ marginTop: '2rem' }} maxWidth="xl">
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
        }}
      >
        Kategorier
      </Typography>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        sx={{ gap: '5rem', margin: '2rem 0' }}
      >
        {displayCategories.map((c, i) => (
          <Link key={c} to={'products?category=' + (c as string).toLowerCase()}>
            <Card sx={{ maxWidth: 300, borderRadius: '1rem' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="340"
                  image={categoryImages[i]}
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {c}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

export default CategoriesCard;
