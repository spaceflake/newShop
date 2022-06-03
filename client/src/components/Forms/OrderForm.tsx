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
import { useProduct } from '../../contexts/ProductsContext';

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
  paymentMethod: Yup.string().required('You need to choose a payment option'),
  shippingMethod: Yup.string().required('You need to choose a delivery option'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Please enter your cardnumber.'),
  }),
  cvc: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Please enter your CVC-code.'),
  }),
  expDate: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('Please enter your expire date.'),
  }),
  personalNumber: Yup.string().when('paymentMethod', {
    is: 'klarna',
    then: (schema) => schema.required('Please enter your birthnumber.'),
  }),
  phone: Yup.string().when('paymentMethod', {
    is: 'swish',
    then: (schema) => schema.required('Please enter your phonenumber.'),
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
    const { deliveryAddress, shippingMethod } = orderData;

    const order = {
      deliveryAddress,
      products: productsDetails,
      shippingMethod,
    };

    // fetch api and navigate to confirmed-order page if successful
    // const success = await placeOrderFetch();
    try {
      // updateStock();
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
              Choose your payment and delivery method
            </Typography>
            {/* RANDOM INFO TEXT, DOESN'T ACTUALLY DO/MEAN ANYTHING */}

            {/* The full order form */}
            <form onSubmit={formikProps.handleSubmit}>
              {/* Shipping adress */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Shipping address
              </Typography>
              <ShippingForm formikProps={formikProps} />

              {/* Shipping methods */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Delivery method
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
                Payment method{' '}
              </Typography>

              {/* Show error if no payment method is selected */}
              {formikProps.touched.paymentMethod &&
                formikProps.errors.paymentMethod}

              <PaymentBox formikProps={formikProps} />

              {/* conditions checkbox, does nothing for now */}
              <div>
                <FormControlLabel control={<Checkbox />} label="I approve" />
                <Link to="/termsOfUse">Terms of use.</Link>
              </div>

              {/* Post form */}

              <Button
                sx={{
                  height: '3rem',
                  marginTop: '2rem',
                  bgcolor: '#ED6C02',
                  border: 'none',
                  color: ' white',
                  fontSize: '1.5rem',
                  '&:hover': {
                    border: 'none',
                    bgcolor: '#181818',
                    color: 'white',
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
                Submit order
              </Button>
            </form>
          </Box>
        </>
      ) : (
        <>
          {' '}
          <LinearProgress /> <br />
          Checking order...
        </>
      )}
    </>
  );
}

export default OrderForm;
