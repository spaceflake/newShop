import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { Types } from "../contexts/Reducers";

function BuyButton({ dispatch, product }: any) {
  return (
    <>
      <Button
        sx={{
          mt: 2,
          mb: 2,
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
        onClick={() => {
          dispatch({
            type: Types.AddToCart,
            payload: product,
          });
        }}
        variant="outlined"
        endIcon={<AddShoppingCartIcon />}
      >
        Buy now {product.price}kr
      </Button>
    </>
  );
}

export default BuyButton;
