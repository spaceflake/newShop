import {
  accordionSummaryClasses,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios, { AxiosResponse } from 'axios';
import { Order, Product } from '@shared/types';

export default function UserPage() {
  const { user } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [orderPrdocuts, setOrderPrdocuts] = useState<any[]>([]);
  const [userOrdersdeliveryAddress, setUserOrdersdeliveryAddress] = useState<
    any[]
  >([]);
  console.log(user?.id);

  // const orserProducts = userOrders.filter()
  const getOrderDetails = () => {
    for (let i = 0; i < userOrders.length; i++) {
      const order = userOrders[i];
      setOrderPrdocuts(order.products);
      setUserOrdersdeliveryAddress(order.deliveryAddress);
      console.log('deliveryAddress', order.deliveryAddress);
      console.log('products', order.products);
    }
  };

  // const OrderAddress = userOrders.filter()

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await axios.get('/api/users-orders/' + user?.id);
      const userOrders = await res.data;
      setUserOrders(userOrders);
      console.log('userOrders', userOrders);
    };
    getUserOrders();
    getOrderDetails();
  }, [user?.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.put('/api/user/adminrequest/' + user?.id);
    const result = await res.data;

    console.log('Request to become admin totally sent, I promise.. ' + result);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6">Your previous orders:</Typography>
      <Box>
        {userOrders.map((order) => (
          <Grid key={order.id} item xs={12} sm={6} md={4} lg={3}>
            Your order with the num: {order.id}
            {order.isSent ? <p> has been sent</p> : <p>not sent yet</p>}
            {/* {orderPrdocuts.map((product) => (
            <List key={product.id} >
              {product.title}
            </List>
          ))}
              {userOrdersdeliveryAddress.map((Address, n) => (
            <List key={n} >
              {Address.city}
            </List>
          ))} */}
          </Grid>
        ))}
      </Box>

      <form
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControlLabel
          control={<Checkbox required />}
          label="I wish to become an admin"
        />
        <Button
          sx={{
            mt: 2,
            mb: 2,
            height: '3rem',
            bgcolor: '#ED6C02',
            border: 'none',
            color: ' white',
            '&:hover': {
              bgcolor: '#181818',
              color: 'white',
            },
          }}
          variant="outlined"
          type="submit"
        >
          Submit request
        </Button>
      </form>
    </Box>
  );
}
