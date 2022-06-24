import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import type { Product } from '@shared/types';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { CartType } from '../../contexts/Reducers';
import BuyButton from '../BuyButton';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { dispatch } = useCart();

  return (
    <Card
      elevation={1}
      key={product.id}
      sx={{
        width: '300px',
        borderRadius: '0.25rem',
        padding: '1rem',
      }}
    >
      <CardActionArea>
        <Link to={`/products/${product.id}`}>
          <CardContent sx={{ padding: '0' }}>
            <CardMedia
              component="img"
              height="240"
              src={product.photoUrl}
              sx={{ objectFit: 'contain', objectPosition: 'center top' }}
            />
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap-reverse',
                alignItems: 'center',
                marginBlock: '1rem',
                flexDirection: 'column',
              }}
            >
              <Box component="span"></Box>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
      <Box sx={{ textAlign: 'left' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            component="span"
            sx={{ marginRight: '.4rem', color: '#181818' }}
          >
            {product.title}
          </Typography>
          <Typography variant="h6" component="span">
            {product.price} kr
          </Typography>
        </Box>
        <Typography sx={{ marginRight: '.4rem', color: '#181818' }}>
          {product.stock <= 0
            ? 'Out of stock'
            : `${product.stock} left in stock`}
        </Typography>
      </Box>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: '0',
        }}
      >
        <Link to={`/products/${product.id}`}>
          <Button
            sx={{
              padding: '0.5rem 1rem',
              color: 'black',
              border: 'solid',
              borderColor: 'white',
              bgcolor: 'white',
              '&:hover': {
                border: 'solid',
                borderColor: 'black',
                bgcolor: '#181818',
                color: 'white',
              },
            }}
            variant="outlined"
          >
            Show
          </Button>
        </Link>
          <BuyButton dispatch={dispatch} product={product} />
      </CardActions>
    </Card>
  );
}

export default ProductCard;
