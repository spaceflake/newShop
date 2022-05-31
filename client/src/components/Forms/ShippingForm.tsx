import { FormikProps } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import { OrderData } from './OrderForm';
import type { Address } from '@shared/types';

type ShippingAdressSchemaType = Record<keyof Address, Yup.AnySchema>;

export const AdressFormSchema = Yup.object().shape<ShippingAdressSchemaType>({
  firstName: Yup.string().required('Vänligen fyll i ditt förnamn.'),
  lastName: Yup.string().required('Vänligen fyll i ditt efternamn.'),
  street: Yup.string().required('Vänligen fyll i din postadress.'),
  zipcode: Yup.string()
    .min(5)
    .max(5)
    .required('Vänligen fyll i ditt postnummer.'),
  city: Yup.string().required('Vänligen fyll i din stad.'),
  phone: Yup.string().required('Vänligen fyll i ditt telefonnummer.'),
  email: Yup.string().required('Vänligen fyll i din e-postadress.'),
});

interface Props {
  formikProps: FormikProps<OrderData>;
}

export const emptyShippingForm: Address = {
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  city: '',
  zipcode: '',
  email: '',
};

function ShippingForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;

  return (
    <>
      {/* First name input */}
      <InputField
        label="Förnamn"
        id="deliveryAddress.firstName"
        name="deliveryAddress.firstName"
        type="text"
        value={values.deliveryAddress.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.firstName &&
          !!errors.deliveryAddress?.firstName
        }
        helperText={
          touched.deliveryAddress?.firstName &&
          errors.deliveryAddress?.firstName
        }
      />

      {/* Last name input */}
      <InputField
        label="Efternamn"
        id="deliveryAddress.lastName"
        name="deliveryAddress.lastName"
        type="text"
        value={values.deliveryAddress.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.lastName &&
          !!errors.deliveryAddress?.lastName
        }
        helperText={
          touched.deliveryAddress?.lastName && errors.deliveryAddress?.lastName
        }
      />

      {/* Street adress input */}
      <InputField
        label="Postadress"
        id="deliveryAddress.street"
        name="deliveryAddress.street"
        type="text"
        value={values.deliveryAddress.street}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.street && !!errors.deliveryAddress?.street
        }
        helperText={
          touched.deliveryAddress?.street && errors.deliveryAddress?.street
        }
      />

      {/* Post code input */}
      <InputField
        label="Postnummer"
        id="deliveryAddress.zipcode"
        name="deliveryAddress.zipcode"
        type="text"
        value={values.deliveryAddress.zipcode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.zipcode && !!errors.deliveryAddress?.zipcode
        }
        helperText={
          touched.deliveryAddress?.zipcode && errors.deliveryAddress?.zipcode
        }
      />

      {/* city input */}
      <InputField
        label="Stad"
        id="deliveryAddress.city"
        name="deliveryAddress.city"
        type="text"
        value={values.deliveryAddress.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.deliveryAddress?.city && !!errors.deliveryAddress?.city}
        helperText={
          touched.deliveryAddress?.city && errors.deliveryAddress?.city
        }
      />

      {/* phone number input */}
      <InputField
        label="Telefonnummer"
        id="deliveryAddress.phone"
        name="deliveryAddress.phone"
        type="text"
        value={values.deliveryAddress.phone}
        onChange={(e) => {
          handleChange(e);
          // checks if other number is filled in under swish, won't overwrite.
          if (!props.formikProps.values.phone) {
            // adds phonenumber to swish if swishnumber is empty
            props.formikProps.setFieldValue('phone', e.target.value);
          }
        }}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.phone && !!errors.deliveryAddress?.phone
        }
        helperText={
          touched.deliveryAddress?.phone && errors.deliveryAddress?.phone
        }
      />

      {/* email adress input */}
      <InputField
        label="E-postadress"
        id="deliveryAddress.email"
        name="deliveryAddress.email"
        type="text"
        value={values.deliveryAddress.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.deliveryAddress?.email && !!errors.deliveryAddress?.email
        }
        helperText={
          touched.deliveryAddress?.email && errors.deliveryAddress?.email
        }
      />
    </>
  );
}

export default ShippingForm;
