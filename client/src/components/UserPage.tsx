import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useUser } from '../contexts/UserContext';
import axios, { AxiosResponse } from 'axios';
import { Order } from '@shared/types';

  
export default function UserPage() {
    const { user } = useUser();
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    console.log(user?.id);
    
    useEffect(() => {
        const getUserOrders = async () => {
          const res = await axios.get('/api/users-orders/' + user?.id);
          const userOrders = await res.data;
    
          setUserOrders(userOrders);
          console.log(userOrders);
          
        };
    
        getUserOrders();
      }, [user?.id]);
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('Request to become admin totally sent, I promise..')
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h6">Your previous orders:</Typography>
            <Box>

            </Box>

            <form style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onSubmit={(e) => handleSubmit(e)}>
                <FormControlLabel control={<Checkbox required />} label="I wish to become an admin" />
                <Button
                    sx={{
                        mt: 2,
                        mb: 2,
                        height: "3rem",
                        bgcolor: "#ED6C02",
                        border: "none",
                        color: " white",
                        "&:hover": {
                            bgcolor: '#181818',
                            color: 'white',
                        },
                    }}
                    variant="outlined"
                    type="submit">
                    Submit request
                </Button>
            </form>
        </Box>
    )
}