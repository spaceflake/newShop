import { Box, TextField, TextFieldProps } from "@mui/material";


function InputField(props: TextFieldProps) {
  return (
    <>
    <Box
        component={'div'}
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      >
        <TextField {...props} variant="outlined" />
     </Box>
    </>
  );
}

export default InputField;
