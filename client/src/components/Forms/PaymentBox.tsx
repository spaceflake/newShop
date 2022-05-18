import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from "@mui/material";

import React from "react";
import CardPaymentForm from "./CardPaymentForm";
import SwishForm from "./SwishForm";
import KlarnaForm from "./KlarnaForm";
import { paymentOptions, Payment } from "../../Api/Data";
import { FormikProps } from "formik";
import { OrderData } from "./OrderForm";

interface Props {
  formikProps: FormikProps<OrderData>;
}

function PaymentBox(props: Props) {
  // to handle the state of the accordion
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  
  // Checks which button is clicked
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    // if clicked, sets value (seen in orderDetails) to chosen method
    props.formikProps.setFieldValue("paymentMethod", index);
  };

  // Expands the button (accordion)
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    // Payment options box
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="Payment options list">
        
        {/* Loops through the full array of payment options */}
        {paymentOptions.length !== 0 &&
          paymentOptions.map((payment: Payment, index) => (

            // sets value of the object in the array
            <ListItemButton
              key={payment.id}
              selected={selectedIndex === index}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleListItemClick(event, index)
              }
            >
              <Accordion
                sx={{
                  boxShadow: 0,
                  margin: 0,
                  bgcolor: "transparent",
                  padding: 0,
                  border: "none",
                }}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                {/* Displays logo selected index in array */}
                <AccordionSummary sx={{ padding: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={payment.logo} alt={`${payment.name} logo`} />
                  </ListItemAvatar>

                  {/* Displays name selected index in array */}
                  <ListItemText
                    primary={payment.name}
                    secondary={`${payment.altText}`}
                  ></ListItemText>
                </AccordionSummary>

                {/* Inserts forms */}
                <AccordionDetails>
                  {selectedIndex === 0 && (
                    <KlarnaForm formikProps={props.formikProps} />
                  )}
                  {selectedIndex === 1 && (
                    <SwishForm formikProps={props.formikProps} />
                  )}
                  {selectedIndex === 2 && (
                    <CardPaymentForm formikProps={props.formikProps} />
                  )}
                </AccordionDetails>
              </Accordion>
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
}

export default PaymentBox;
