import { Button, Checkbox, List, ListItem, Typography } from '@mui/material';
import { Order } from '@shared/types';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
const AdminOrderControl = () => {
  // state for checkbox
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedorder, setSelectedorder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // get all orders

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get('/api/order');
      const orders = await res.data;

      setOrders(orders);
    };

    getOrders();
  }, [isLoading]);

  const handleClick = async () => {
    await axios
      .put('/api/order/' + selectedorder, {
        isSent: true,
      })
      .then(
        (res: AxiosResponse) => {
          console.log(res.data.msg);
          setIsLoading(!isLoading);
        },
        () => {
          console.log('Failure');
        }
      );
  };

  return (
    <>
      {orders.map((order) => (
        <List key={order.id}>
          <ListItem sx={{ marginBlock: '1rem' }}>
            <Typography variant="body1">{order.id}</Typography>
            {order.isSent === false ? (
              <>
                <Checkbox
                  onChange={() => {
                    setSelectedorder(order.id);
                  }}
                />
                <Button
                  onClick={handleClick}
                  disabled={selectedorder === order.id ? false : true}
                >
                  Mark as sent
                </Button>
              </>
            ) : null}
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default AdminOrderControl;
