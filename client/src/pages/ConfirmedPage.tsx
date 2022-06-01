import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Order } from "@shared/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ConfirmedOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`/api/order/${id}`);
      const orderData = res.data;

      setOrder(orderData);
    };

    getOrder();
  }, [id]);

  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#ffffff", padding: 2 }}>
        <h2>Thank you for your order!</h2>
        <p>
          Your payment and order has been confirmed, your new hats are on it's
          way! <br />
          Here you can see the summary ;
        </p>
        <Divider />
        <h3>Order number: {order?.orderId}</h3>
        <h3>Products:</h3>
        <List dense>
          {order
            ? order.products.map((product) => (
                <ListItem key={product.id}>
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
                    secondary={`Quantity: ${product.qty} Price: ${product.price} kr/each`}
                  />
                  <ListItemText
                    primary={`${product.qty * product.price} kr`}
                    sx={{ textAlign: "right" }}
                  />
                </ListItem>
              ))
            : ""}
        </List>
        <Divider />
        {/* get and print total price of products */}
        {/* the second "total" should be shipping cost */}
        {/* <Typography variant="body1" sx={{ textAlign: 'right' }}>
          Totalpris (inkl moms & frakt) : {`${order?.orderTotal}`} kr
        </Typography> */}

        {/* Get shipping adress from local storage  */}
        <h3>Delivery address:</h3>
        {/* first and last name */}
        <>
          {order?.deliveryAddress[0].firstName}{" "}
          {order?.deliveryAddress[0].lastName}
        </>
        <br />
        {/* shipping adress */}
        <>{order?.deliveryAddress[0].street}</>
        <br />
        {/* post code and city */}
        <>
          {order?.deliveryAddress[0].zipcode} {order?.deliveryAddress[0].city}
        </>
        <br />
        {/* phone number */}
        <>Phone number: {order?.deliveryAddress[0].phone}</>
        <br />
        {/* e-mailadress */}
        <>Email: {order?.deliveryAddress[0].email}</>
        <br />
        <Divider />
        {/* Get shipping method  TODO  */}
        {/* <h3>Leveransmetod:</h3>
        <>
          {typeof order.order.shippingMethod === 'number'
            ? deliveryOptions[order.order.shippingMethod].name
            : ''}
        </> */}
        <Divider />
        {/* Get payment method  Todo  */}
        {/* <h3>Betalningsmetod:</h3>
        <>
          {typeof order.order.paymentMethod === 'number'
            ? paymentOptions[order.order.paymentMethod].name
            : ''}
        </> */}
        <Divider />
        <p>
          If your order isn't correct you can always contact us at:
          hatonhats@hatmail.com
        </p>
      </Box>
    </Container>
  );
}

export default ConfirmedOrderPage;
