import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  IconButton,
  Paper,
  Popover,
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
import React from 'react';

interface OrderProp {
  order: Order;
}

const OrderRow = ({ order }: OrderProp) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<String>();
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const updateSentStatus = async () => {
    setIsLoading(true);
    await axios
      .put('/api/order/' + selectedOrder, {
        isSent: true,
      })
      .then((res: AxiosResponse) => {
        setIsLoading(false);
        handleClose();
        setOpen(false);
      });
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ pr: '0' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ pr: '0' }}>
          {order.id}
        </TableCell>
        {/* <TableCell align="right">{order.createdAt}</TableCell> */}
        <TableCell align="right">
          {order.isSent ? (
            <Chip icon={<LocalShippingIcon />} color="success" />
          ) : (
            <Chip icon={<InventoryIcon />} color="warning" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, overflowX: 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Order details
                </Typography>
                {order.isSent ? (
                  <Chip icon={<LocalShippingIcon />} label="Shipped" />
                ) : (
                  <>
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedOrder(order.id);
                      }}
                    >
                      {!isLoading ? 'Mark as sent' : <CircularProgress />}
                    </Button>
                    <Popover
                      id={id}
                      open={openPop}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <Typography sx={{ p: 2 }}>Confirm?</Typography>
                      <Button sx={{ p: 2 }} onClick={updateSentStatus}>
                        Yes
                      </Button>
                      <Button sx={{ p: 2 }} onClick={handleClose}>
                        No
                      </Button>
                    </Popover>
                  </>
                )}
              </Box>
              <Typography variant="body2" gutterBottom component="div">
                {`Order date: ${order.createdAt.toString().split('T')[0]}`}
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
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell align="right">Lastname</TableCell>
                    <TableCell align="right">Street</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Zipcode</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {order.deliveryAddress.map((deliveryRow) => (
                    <TableRow key={deliveryRow.email}>
                      <TableCell>
                        <Box>
                          <Typography>
                            {`${deliveryRow.firstName} ${deliveryRow.lastName}`}
                          </Typography>
                          <Typography>{deliveryRow.street}</Typography>
                          <Typography>{deliveryRow.city}</Typography>
                          <Typography>{deliveryRow.zipcode}</Typography>
                          <Typography>{deliveryRow.email}</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
          <TableHead
            sx={{
              backgroundColor: 'hsl(214, 100%, 76%)',
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell sx={{ pr: '0' }}>Order Id</TableCell>
              {/* <TableCell align="right">Order date</TableCell> */}
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
