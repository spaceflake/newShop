import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Order } from '@shared/types';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface OrderProp {
  order: Order;
}

const OrderRow = ({ order }: OrderProp) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<String>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await axios
      .put('/api/order/' + selectedOrder, {
        isSent: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data.msg);
        setIsLoading(!isLoading);
      });
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="right">{order.createdAt}</TableCell>
        <TableCell align="right">
          {order.isSent ? 'shipped' : 'not shipped'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom component="div">
                Order details
              </Typography>
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
                    <TableRow key={productRow.title}>
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
              <Typography variant="h6" gutterBottom component="div">
                Delivery details
              </Typography>
              <Table size="small" aria-label="delivery">
                <TableHead>
                  <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell align="right">Lastname</TableCell>
                    <TableCell align="right">Street</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Zipcode</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.deliveryAddress.map((deliveryRow) => (
                    <TableRow key={deliveryRow.email}>
                      <TableCell component="th" scope="row">
                        {deliveryRow.firstName}
                      </TableCell>
                      <TableCell align="right">
                        {deliveryRow.lastName}
                      </TableCell>
                      <TableCell align="right">{deliveryRow.street}</TableCell>
                      <TableCell align="right">{deliveryRow.city}</TableCell>
                      <TableCell align="right">{deliveryRow.zipcode}</TableCell>
                      <TableCell align="right">{deliveryRow.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {order.isSent ? (
                'shipped'
              ) : (
                <Button
                  onClick={() => {
                    setSelectedOrder(order.id);
                    if (selectedOrder) {
                      handleClick();
                      console.log(selectedOrder);
                    }
                  }}
                >
                  {!isLoading ? 'Mark as sent' : <CircularProgress />}
                </Button>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const AdminOrderControl = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (orders.length && !isLoading) {
      return;
    }
    setIsLoading(true);
    const getOrders = async () => {
      const res = await axios.get('/api/order');
      const orders = await res.data;

      if (orders) {
        setOrders(orders);
        setIsLoading(false);
      }
    };

    getOrders();
  }, [isLoading, orders.length]);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: 'hsl(214, 100%, 76%)' }}>
            <TableRow>
              <TableCell />
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Order date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              orders.map((order) => <OrderRow key={order.id} order={order} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrderControl;
