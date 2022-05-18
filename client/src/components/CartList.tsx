import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ButtonGroup,
  Button,
  ListItemIcon,
  Tooltip,
  IconButton,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartType, Types } from "../contexts/Reducers";

function CartList({ handleClose }: any) {
  const { cart, dispatch, total } = useCart();

  return (
    <>
      <List>
        {cart && cart.length > 0 ? (
          cart.map((product: CartType) => (
            <ListItem key={product.id} sx={{bgcolor:"#fffff"}}>
              <ListItemAvatar>
                <img
                  src={product.imgURL}
                  alt={product.title}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={`${product.price} kr/st`}
                sx={{ marginLeft: ".5rem" }}
              />
              <ButtonGroup
                size="small"
                sx={{
                  flexGrow: "1",
                  justifyContent: "flex-end",
                  "@media screen and (max-width: 440px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Button
                  sx={{
                    "@media screen and (max-width: 440px)": {
                      padding: "0",
                      border: "none",
                    },
                  }}
                  onClick={() => {
                    dispatch({
                      type: Types.UpdateQty,
                      payload: {
                        id: product.id,
                        qty: (product.qty -= 1),
                      },
                    });
                  }}
                >
                  <RemoveIcon />
                </Button>
                <Button
                  sx={{
                    "@media screen and (max-width: 440px)": {
                      padding: "0",
                      border: "none",
                    },
                  }}
                  disableRipple
                >
                  {product.qty}
                </Button>
                <Button
                  sx={{
                    "@media screen and (max-width: 440px)": {
                      padding: "0",
                      border: "none",
                    },
                  }}
                  onClick={() => {
                    dispatch({
                      type: Types.UpdateQty,
                      payload: {
                        id: product.id,
                        qty: (product.qty += 1),
                      },
                    });
                  }}
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>

              <ListItemText
                sx={{
                  textAlign: "right",
                  "@media screen and (max-width: 440px)": {
                    display: "none",
                  },
                }}
              >
                {product.price * product.qty} kr
              </ListItemText>
              <ListItemIcon>
                <Tooltip title="Ta bort">
                  <IconButton
                    sx={{
                      "@media screen and (max-width: 440px)": {
                        marginLeft: "20px",
                      },
                    }}
                    aria-label="delete"
                    edge="end"
                    onClick={() => {
                      dispatch({
                        type: Types.DeleteFromCart,
                        payload: product,
                      });
                    }}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">Här var det tomt!</Typography>
        )}
      </List>
      <Divider
        light
        textAlign="right"
        sx={{ "@media screen and (max-width: 440px)": {  } }}
      >
        Summa
      </Divider>
      <Box
        maxWidth="md"
        sx={{
          paddingInline: "1rem",
          textAlign: "right",
          "@media screen and (max-width: 440px)": {
            padding: "0",
          },
        }}
      >
        <Typography variant="h6" textAlign="right" sx={{ mb: 10, mr:4 }}>
          {total} kr
        </Typography>
        <Link to="/products">
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              bgcolor: "white",
              border: "1",
              borderColor: "white",
              color: " black",
              "&:hover": {
                bgcolor: "#dfdfdf",
                border: "1",
                borderColor: "#dfdfdf",
                color: "black",
              },
              "@media screen and (max-width: 440px)": {
                width: "100%",
                borderRadius: "0",
              },
            }}
            onClick={handleClose}
          >
            Fortsätt handla
          </Button>
        </Link>
        <Link to={cart.length ? "/checkoutPage" : ""}>
          <Button
            sx={{
              bgcolor: "#0EDFE6",
              border: "none",
              color: " black",
              "&:hover": {
                bgcolor: "#eaa0ff",
                border: "none",
                color: "black",
              },
              "@media screen and (max-width: 440px)": {
                width: "100%",
                borderRadius: "0",
              },
            }}
            variant="outlined"
            endIcon={<PaymentIcon />}
            disabled={cart.length > 0 ? false : true}
            onClick={handleClose}
          >
            Till betalning
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default CartList;
