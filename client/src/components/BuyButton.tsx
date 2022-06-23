import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { Product } from '@shared/types';
import { CartActions, Types } from '../contexts/Reducers';

interface Props {
  product: Product;
  dispatch: React.Dispatch<CartActions>;
}

function BuyButton({ dispatch, product }: Props) {
  return (
    <>
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
    </>
  );
}

export default BuyButton;
