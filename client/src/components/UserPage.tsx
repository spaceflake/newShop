import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Order } from '@shared/types';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function UserPage() {
  const { user } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [adminRequested, setAdminRequested] = useState(false);

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await axios.get('/api/users-orders/' + user?.id);
      const userOrders = await res.data;
      setUserOrders(userOrders);
    };
    getUserOrders();
  }, [user?.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.put('/api/user/adminrequest/' + user?.id);
    const result = await res.data;
    if (result) {
      setOpen(true);
      setAdminRequested(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Container>
      <Typography variant="h6" mt={5}>
        Hi, {user?.firstName}!
      </Typography>
      <Typography variant="body1">
        You have made {userOrders.length} orders with us.
      </Typography>
      <Typography variant="h6" mt={5} mb={3}>
        Your previous orders:
      </Typography>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column',}}>
        {userOrders.map((order) => (
          <Grid
            key={order.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={12}
            sx={{ borderBottom: '1px solid black', padding: '.5em' }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}} >
              <Typography>Order ID:</Typography>
              <Typography>{order.id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}} >
              <Typography> Order date::</Typography>
              <Typography>{order.createdAt.toString().split('T')[0]}</Typography>
              </Box>
            </Box>
            <Typography variant="h6">Order details:</Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price (SEK)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((productRow) => (
                    <TableRow key={productRow.id}>
                      <TableCell component="th" scope="row">
                        {productRow.title}
                      </TableCell>
                      <TableCell align="right">{productRow.qty}</TableCell>
                      <TableCell align="right">
                        {productRow.qty * productRow.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            {/* {order.products.map((prod) => (
              <Box key={prod.id} sx={{ padding: '.5em' }}>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <p>{prod.title}</p>
                  <p>{prod.qty}</p>
                </Box>
              </Box>
            ))} */}
            <Typography variant="h6">Delivery details:</Typography>
            {order.deliveryAddress.map((delivery) => (
              <Box key={delivery.firstName} sx={{ padding: '.5em' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1">{delivery.street}</Typography>
                  <Typography variant="body1">{delivery.city}</Typography>
                  <Typography variant="body1">{delivery.zipcode}</Typography>
                </Box>
              </Box>
            ))}
            {order.isSent ? <p>Your order has been Shipped</p> : <p>Pending</p>}
          </Grid>
        ))}
      </Grid>

      {user?.isAdmin ? null : adminRequested ? (
        'Request for Admin role under review'
      ) : (
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
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Request sent"
        action={action}
      />
    </Container>
  );
}
