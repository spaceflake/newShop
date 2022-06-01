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
  const { cart, dispatch } = useCart();

  return (
    <Card key={product.id} sx={{ borderRadius: '1rem', padding: '1rem' }}>
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
              <Typography
                variant="h5"
                component="span"
                fontWeight="700"
                sx={{ marginRight: '.4rem', color: '#181818' }}
              >
                {product.title}
              </Typography>

              <Box component="span">
                <Typography
                  component="span"
                  sx={{ marginRight: '.4rem', color: '#181818' }}
                >
                  {product.stock === 0 ? 'Out of stock' : `${product.stock} left in stock`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          padding: '0',
        }}
      >
        <Link to={`/products/${product.id}`}>
          <Button
            sx={{
              margin: '1rem 0.5rem',
              padding: '0.5rem 1rem',
              color: 'black',
              border: 'solid',
              borderColor: 'black',
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
        {cart && cart.some((p: CartType) => p.id === product.id) ? (
          <Button>In cart</Button>
        ) : product.stock === 0 ? (
          'not in stock'
        ) : (
          <BuyButton dispatch={dispatch} product={product} />
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
