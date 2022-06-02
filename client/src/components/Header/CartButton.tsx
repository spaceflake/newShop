import { Button, Badge, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import CartList from "../CartList";

function CartButton() {
  let location = useLocation();
  const { cart } = useCart();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [active, setActive] = useState(false);

  const pageLoc = location.pathname;

  useEffect(() => {
    if (pageLoc === "/checkoutPage") {
      setActive(true);
    } else if (pageLoc === "/confirmed-order") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pageLoc]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        sx={{
          bgcolor: "transparent",
          border: "none",
          "&:hover": {
            bgcolor: "transparent",
            border: "none",
          },
          "&:disabled": {
            border: "none",
          },
        }}
        variant="outlined"
        aria-describedby={id}
        onClick={handleClick}
        disabled={active}
      >
        <Badge badgeContent={cart?.length} color='warning' showZero>
          <ShoppingCartIcon
            sx={{
              color: "#181818",
              height: "2.5rem",
              width: "2.5rem",
              border: "none",
            }}
          />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {cart?.length > 0 ? (
          <CartList handleClose={handleClose} />
        ) : (
          <Typography variant="body2">Your cart is empty.</Typography>
        )}

        {cart.length > 0 && (
          <Link to="cartPage" onClick={handleClose}>
            <Button
              sx={{
                marginTop: '1rem',
                height: "3rem",
                bgcolor: "#ED6C02",
                border: "none",
                color: " white",
                "&:hover": {
                  bgcolor: '#181818',
                  color: 'white',
                },
                "@media screen and (max-width: 440px)": {
                  display: "none",
                },
              }}
              variant="contained"
              fullWidth
            >
              Go to cart
            </Button>
          </Link>
        )}
      </Popover>
    </>
  );
}

export default CartButton;
