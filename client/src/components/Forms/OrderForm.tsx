import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Typography,
} from '@mui/material';
import type { Address } from '@shared/types';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { deliveryOptions } from '../../Api/Data';
import { useCart } from '../../contexts/CartContext';
import { CartType, Types } from '../../contexts/Reducers';
import useLocalStorage from '../../Hooks/useLocalStorage';
import PaymentBox from './PaymentBox';
import ShipmentBox from './ShipmentBox';
import ShippingForm, {
  AdressFormSchema,
  emptyShippingForm,
} from './ShippingForm';
import { useUser } from '../../contexts/UserContext';

export interface OrderData {
  deliveryAddress: Address;
  paymentMethod: string | number | readonly string[] | undefined;
  shippingMethod: number | undefined;
  cardNumber: string;
  cvc: string;
  expDate: string;
  personalNumber: string;
  phone: string;
}

const emptyForm: OrderData = {
  deliveryAddress: emptyShippingForm,
  paymentMethod: '',
  shippingMethod: undefined,
  cardNumber: '',
  cvc: '',
  expDate: '',
  personalNumber: '',
  phone: '',
};

export type OrderSchemaType = Record<keyof OrderData, Yup.AnySchema>;

const OrderFormSchema = Yup.object().shape<OrderSchemaType>({
  deliveryAddress: AdressFormSchema,
  paymentMethod: Yup.string().required('Du måste välja ett betalsätt'),
  shippingMethod: Yup.string().required('Du måste välja ett fraktsätt'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Vänligen fyll i ditt kortnummer.'),
  }),
  cvc: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Vänligen fyll i din CVC-kod.'),
  }),
  expDate: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Vänligen fyll i utgångsdatum.'),
  }),
  personalNumber: Yup.string().when('paymentMethod', {
    is: 'klarna',
    then: (schema) => schema.required('Vänligen fyll i ditt personnummer.'),
  }),
  phone: Yup.string().when('paymentMethod', {
    is: 'swish',
    then: (schema) => schema.required('Vänligen fyll i ditt telefonnummer.'),
  }),
});

export interface AllOrderData {
  orderDetails: OrderData;
  orderTotal: number;
  products: CartType[];
}

interface Props {
  defaultOrderData?: OrderData;
  setShippingMethod: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function OrderForm(props: Props) {
  const { user } = useUser();

  let navigate = useNavigate();
  const { dispatch } = useCart();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  // let [allOrderDetails, setAllDetails] = useLocalStorage<AllOrderData>(
  //   'orderDetails',
  //   ''
  // );
  let [sumDetails] = useLocalStorage<number>('cartSum', '');
  let [productsDetails] = useLocalStorage<CartType[]>('cart', '');

  // successful submit
  async function handleSubmit(orderData: OrderData) {
    setLoading(true);
    const { deliveryAddress /* shippingMethod */ } = orderData;

    const order = {
      deliveryAddress,
      products: productsDetails,
      // shippingMethod,
    };

    // fetch api and navigate to confirmed-order page if successful
    // const success = await placeOrderFetch();
    try {
      const res = await axios.post('/api/order', order);

      const result = await res.data;

      console.log(result);

      if (result.success) {
        dispatch({
          type: Types.ResetCart,
          payload: {},
        });
        setLoading(false);
        navigate(`/confirmed-order/${result.order.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //populate a full Local storage key with all order details
  // function setOrderDetails(orderDetails: OrderData) {
  //   allOrderDetails = {
  //     orderDetails: orderDetails,
  //     orderTotal:
  //       sumDetails +
  //       (typeof orderDetails.shippingMethod === 'number'
  //         ? deliveryOptions[orderDetails.shippingMethod].price
  //         : 0),
  //     products: productsDetails,
  //   };

  //   setAllDetails(allOrderDetails);
  // }

  const formikProps = useFormik<OrderData>({
    initialValues: emptyForm,
    validationSchema: OrderFormSchema,
    onSubmit: (orderData) => {
      handleSubmit(orderData);
    },
  });

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            sx={{
              bgcolor: '#ffffff',
              mt: 3,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>
              Välj dina betal och leveransmetoder
            </Typography>
            {/* RANDOM INFO TEXT, DOESN'T ACTUALLY DO/MEAN ANYTHING */}

            {/* The full order form */}
            <form onSubmit={formikProps.handleSubmit}>
              {/* Shipping adress */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Leveransadress
              </Typography>
              <ShippingForm formikProps={formikProps} />

              {/* Shipping methods */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Leveransmetod
              </Typography>

              {/* Show error if no shipping method is selected */}
              {formikProps.touched.shippingMethod &&
                formikProps.errors.shippingMethod}

              <ShipmentBox
                formikProps={formikProps}
                setShippingMethod={props.setShippingMethod}
              />

              {/* Payment methods (and payment details) */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Betalningsmetod{' '}
              </Typography>

              {/* Show error if no payment method is selected */}
              {formikProps.touched.paymentMethod &&
                formikProps.errors.paymentMethod}

              <PaymentBox formikProps={formikProps} />

              {/* conditions checkbox, does nothing for now */}
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Jag godkänner"
                />
                <Link to="/termsOfUse">Köpvillkoren.</Link>
              </div>

              {/* Post form */}

              <Button
                sx={{
                  mt: 2,
                  mb: 2,
                  height: '3rem',
                  width: '100%',
                  bgcolor: '#0EDFE6',
                  border: 'none',
                  color: ' black',
                  '&:hover': {
                    bgcolor: '#eaa0ff',
                    border: 'none',
                    color: 'black',
                  },
                  '@media screen and (max-width: 440px)': {
                    borderRadius: '0',
                    mt: 2,
                    mb: 0,
                  },
                }}
                variant="outlined"
                type="submit"
              >
                Slutför beställning
              </Button>
            </form>
          </Box>
        </>
      ) : (
        <>
          {' '}
          <LinearProgress /> <br />
          Kontrollerar beställning...
        </>
      )}
    </>
  );
}

export default OrderForm;
