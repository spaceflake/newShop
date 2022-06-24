import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from '@mui/material';
import { Product } from '@shared/types';
import { useCart } from '../contexts/CartContext';
import { CartActions, CartType, Types } from '../contexts/Reducers';

interface Props {
  product: Product;
  dispatch: React.Dispatch<CartActions>;
}

function BuyButton({ dispatch, product }: Props) {
  const {cart} = useCart()

  return (
    <>
      {cart && cart.some((p: CartType) => p.id === product.id) ? (
        <Button sx={{ color: '#ED6C02' }}>In cart</Button>
      ) : product.stock <= 0 ? (
        <Typography>OUT OF STOCK</Typography>
      ) : (
        <Button
          sx={{
            padding: '0.5rem 1rem',
            color: 'black',
            border: 'solid',
            borderColor: 'white',
            bgcolor: 'white',
            minWidth: 'max-content',
            '&:hover': {
              border: 'solid',
              borderColor: 'black',
              bgcolor: '#181818',
              color: 'white',
            },
          }}
          onClick={() => {
            dispatch({
              type: Types.AddToCart,
              payload: product,
            });
          }}
          variant="outlined"
          endIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
      )}
    </>
  );
}

export default BuyButton;
