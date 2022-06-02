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
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartType, Types } from '../contexts/Reducers';
import { useUser } from '../contexts/UserContext';


function CartList({ handleClose }: any) {
  const { cart, dispatch, total } = useCart();
  const { user } = useUser();

  return (
    <>
      <List>
        {cart && cart.length > 0 ? (
          cart.map((product: CartType) => (
            <ListItem key={product.id} sx={{ bgcolor: "#fffff" }}>
              <ListItemAvatar>
                <img
                  src={product.photoUrl}
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
                secondary={`${product.price} kr/each`}
                sx={{ marginLeft: ".5rem" }}
              />
              <ButtonGroup
                size="small"
                color="warning"
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
                    color: 'black',
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
                    color: 'black',
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
                    color: 'black',
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
                <Tooltip title="Remove">
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
          <Typography variant="body1">Nothing here!</Typography>
        )}
      </List>
      <Divider
        light
        textAlign="right"
        sx={{ "@media screen and (max-width: 440px)": {} }}
      >
        Total
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
        <Typography variant="h6" textAlign="right" sx={{ mb: 10, mr: 4 }}>
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
            Continue shopping
          </Button>
        </Link>

        <Link to={cart.length && user ? '/checkoutPage' : '/login'}>
          <Button
            sx={{
              height: "3rem",
              bgcolor: "#ED6C02",
              border: "none",
              color: " white",
              "&:hover": {
                border: "none",
                bgcolor: '#181818',
                color: 'white',
                "@media screen and (max-width: 440px)": {
                  width: "100%",
                  borderRadius: "0",
                },
              }
            }}
            variant="outlined"
            endIcon={<PaymentIcon />}
            disabled={cart.length > 0 ? false : true}
            onClick={handleClose}
          >
            {user ? 'To payment' : 'Log in to check out'}
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default CartList;
