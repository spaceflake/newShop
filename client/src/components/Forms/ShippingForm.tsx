import { FormikProps } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { OrderData } from "./OrderForm";
import type { Address } from "@shared/types";

type ShippingAdressSchemaType = Record<keyof Address, Yup.AnySchema>;

export const AdressFormSchema = Yup.object().shape<ShippingAdressSchemaType>({
  firstName: Yup.string().required("Please enter your firstname."),
  lastName: Yup.string().required("Please enter your lastname."),
  street: Yup.string().required("Please enter your delivery address."),
  zipcode: Yup.string().min(5).max(5).required("Please enter your zipcode."),
  city: Yup.string().required("Please enter your city."),
  phone: Yup.string().required("Please enter your phone number."),
  email: Yup.string().required("Please enter your email."),
});

interface Props {
  formikProps: FormikProps<OrderData>;
}

export const emptyShippingForm: Address = {
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  city: "",
  zipcode: "",
  email: "",
};

function ShippingForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;

  return (
    <>
      {/* First name input */}
      <InputField
        label="Firstname"
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
        label="Lastname"
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
        label="Delivery address"
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
        label="Zipcode"
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
        label="City"
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
        label="Phone number"
        id="deliveryAddress.phone"
        name="deliveryAddress.phone"
        type="text"
        value={values.deliveryAddress.phone}
        onChange={(e) => {
          handleChange(e);
          // checks if other number is filled in under swish, won't overwrite.
          if (!props.formikProps.values.phone) {
            // adds phonenumber to swish if swishnumber is empty
            props.formikProps.setFieldValue("phone", e.target.value);
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
        label="Email"
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
