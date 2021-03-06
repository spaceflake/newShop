import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import axios from "axios";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import sv from "date-fns/locale/sv";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { Delivery } from "@shared/types";
import { OrderData } from "./OrderForm";

interface Props {
  formikProps: FormikProps<OrderData>;
  setShippingMethod: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function ShipmentBox(props: Props) {
  // the state to  handle clicks
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    undefined
  );
  const [deliveryOptions, setDeliveryoptions] = useState<Delivery[]>([]);

  useEffect(() => {
    const getDeliveryOptions = async () => {
      const res = await axios.get("/api/delivery");
      const data = await res.data;
      setDeliveryoptions(data);
    };
    getDeliveryOptions();
  }, []);

  // Checks which button is clicked
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) =>
    // if clicked, sets value (seen in orderDetails) to chosen method
    {
      setSelectedIndex(index);
      props.setShippingMethod(index);
      props.formikProps.setFieldValue("shippingMethod", index);
    };

  return (
    // The full "form" for delivery
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="Shipping options list">
        {/* loops through array of delivery options */}
        {deliveryOptions.length !== 0 &&
          deliveryOptions.map((delivery: Delivery, index) => (
            <React.Fragment key={delivery.id}>
              {/* displays all objects in array based on index */}
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(
                  event: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => handleListItemClick(event, index)}
              >
                {/* logo for delivery-option */}
                <ListItemAvatar>
                  <Avatar
                    src={delivery.logoUrl}
                    alt={`${delivery.name} logo`}
                  />
                </ListItemAvatar>

                {/* name of delivery-option */}
                <ListItemText
                  primary={delivery.name}
                  secondary={
                    <>
                      {/* altText for delivery-option */}
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >{`${delivery.altText}`}</Typography>

                      {/* Price for delivery-option  */}
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >{`Delivery cost: ${delivery.price} kr`}</Typography>

                      {/* delivery time */}
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"

                        // calculates the expected delivery date based on today's date + shippingTime
                      >{`Lastest date for delivery: ${format(
                        addDays(new Date(), delivery.shippingTime),
                        "d MMMM",
                        { locale: sv }
                      )}`}</Typography>
                    </>
                  }
                />
              </ListItemButton>
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
}

export default ShipmentBox;
