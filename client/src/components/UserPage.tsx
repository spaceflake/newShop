import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { FormEvent } from "react";

export default function UserPage() {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('Request to become admin totally sent, I promise..')
    }

    return (
        <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
            <Typography variant="h6">Your previous orders:</Typography>

            <form onSubmit={(e) => handleSubmit(e)}>
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