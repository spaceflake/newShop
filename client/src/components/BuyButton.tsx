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
          height: "3rem",
          bgcolor: "#0EDFE6",
          border: "none",
          color: " black",
          "&:hover": {
            bgcolor: "#eaa0ff",
            border: "none",
            color: "black",
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
        Köp nu {product.price}kr
      </Button>
    </>
  );
}

export default BuyButton;
