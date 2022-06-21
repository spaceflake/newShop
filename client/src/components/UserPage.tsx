import {
  accordionSummaryClasses,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  Snackbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios, { AxiosResponse } from 'axios';
import { Order, Product } from '@shared/types';

export default function UserPage() {
  const { user } = useUser();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await axios.get('/api/users-orders/' + user?.id);
      const userOrders = await res.data;
      setUserOrders(userOrders);
      console.log('userOrders', userOrders);
    };
    getUserOrders();
  }, [user?.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.put('/api/user/adminrequest/' + user?.id);
    const result = await res.data;
    setOpen(true);
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '1em',
      }}
    >
      <Typography variant="h6">Your previous orders:</Typography>
      <Box sx={{ border: '1px solid black', padding: '.1em' }}>
        {userOrders.map((order) => (
          <Grid
            key={order.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ borderBottom: '1px solid black', padding: '.5em' }}
          >
            <Box>
              Order ID: {order.id}
              <br />
              Order date:
              {order.createdAt}
            </Box>

            <Typography variant="h6">Order details:</Typography>
            {order.products.map((prod) => (
              <Box key={prod.id} sx={{ padding: '.5em' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p>{prod.title}</p>
                  <p>{prod.qty}</p>
                </Box>
              </Box>
            ))}
            {order.isSent ? <p>Your order has been Shipped</p> : <p>Pending</p>}
          </Grid>
        ))}
      </Box>

      {user?.isAdmin ? null : user?.adminRequested ? (
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
    </Box>
  );
}
