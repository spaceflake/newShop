import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { deliveryOptions, paymentOptions } from "../Api/Data";
import { AllOrderData } from "../components/Forms/OrderForm";
import { CartType } from "../contexts/Reducers";
import useLocalStorage from "../Hooks/useLocalStorage";

// randomizes a 6 digit order number
function RandomOrderNumber() {
  return Math.floor(Math.random() * 1000000);
}

function ConfirmedOrderPage() {
  // get cart, total cartsum, all orderdetails and shippingdetails from local storage

  const [orderDetails] = useLocalStorage<AllOrderData>("orderDetails", "");

  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#ffffff", padding: 2 }}>
        <h2>Thank you for your order!</h2>
        <p>
          Your payment and order has been approved! <br />
          Down here you can see the summary of your order.
        </p>
        <Divider />
        {/* get the randomized order number */}
        <h3>Ordernumber: #{RandomOrderNumber()}</h3>
        <h3>Products:</h3>
        {/* get the summary of bought products, loops thought cart array */}
        <List dense>
          {orderDetails.products?.length &&
            orderDetails.products.map((c: CartType) => (
              <ListItem key={c.id}>
                <ListItemAvatar>
                  <img
                    src={c.imgURL}
                    alt={c.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={c.title}
                  secondary={`Antal: ${c.qty} Pris: ${c.price} kr/st`}
                />
                <ListItemText
                  primary={`${c.qty * c.price} kr`}
                  sx={{ textAlign: "right" }}
                />
              </ListItem>
            ))}
        </List>
        <Divider />
        {/* get and print total price of products */}
        {/* the second "total" should be shipping cost */}
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          Totalprice (incl tax & delivery) : {`${orderDetails.orderTotal}`} kr
        </Typography>

        {/* Get shipping adress from local storage  */}
        <h3>Shippingaddress:</h3>
        {/* first and last name */}
        <>
          {orderDetails.orderDetails.shippingAdress.firstName}{" "}
          {orderDetails.orderDetails.shippingAdress.lastName}
        </>
        <br />
        {/* shipping adress */}
        <>{orderDetails.orderDetails.shippingAdress.streetAdress}</>
        <br />
        {/* post code and city */}
        <>
          {orderDetails.orderDetails.shippingAdress.postCode}{" "}
          {orderDetails.orderDetails.shippingAdress.city}
        </>
        <br />
        {/* phone number */}
        <>Phonenumber: {orderDetails.orderDetails.shippingAdress.phoneNumber}</>
        <br />
        {/* e-mailadress */}
        <>Email: {orderDetails.orderDetails.shippingAdress.emailAdress}</>
        <br />
        <Divider />
        {/* Get shipping method from local storage  */}
        <h3>Delivery option:</h3>
        <>
          {typeof orderDetails.orderDetails.shippingMethod === "number"
            ? deliveryOptions[orderDetails.orderDetails.shippingMethod].name
            : ""}
        </>
        <Divider />
        {/* Get payment method from local storage  */}
        <h3>Payment option:</h3>
        <>
          {typeof orderDetails.orderDetails.paymentMethod === "number"
            ? paymentOptions[orderDetails.orderDetails.paymentMethod].name
            : ""}
        </>
        <Divider />
        <p>
          If something is wrong with your order, you can always contact us at
          hatsonhats@hatmail.com.
        </p>
      </Box>
    </Container>
  );
}

export default ConfirmedOrderPage;
