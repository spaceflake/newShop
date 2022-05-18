import { FormikProps } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { OrderData } from "./OrderForm";

type ShippingAdressSchemaType = Record<keyof ShippingAdress, Yup.AnySchema>;

export const AdressFormSchema = Yup.object().shape<ShippingAdressSchemaType>({
  firstName: Yup.string().required("Vänligen fyll i ditt förnamn."),
  lastName: Yup.string().required("Vänligen fyll i ditt efternamn."),
  streetAdress: Yup.string().required("Vänligen fyll i din postadress."),
  postCode: Yup.string()
    .min(5)
    .max(5)
    .required("Vänligen fyll i ditt postnummer."),
  city: Yup.string().required("Vänligen fyll i din stad."),
  phoneNumber: Yup.string().required("Vänligen fyll i ditt telefonnummer."),
  emailAdress: Yup.string().required("Vänligen fyll i din e-postadress."),
});

export interface ShippingAdress {
  firstName: string;
  lastName: string;
  streetAdress: string;
  postCode: string;
  city: string;
  phoneNumber: string;
  emailAdress: string;
}

interface Props {
  formikProps: FormikProps<OrderData>;
}

export const emptyShippingForm = {
  firstName: "",
  lastName: "",
  streetAdress: "",
  postCode: "",
  city: "",
  phoneNumber: "",
  emailAdress: "",
};

function ShippingForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;

  return (
    <>
      {/* First name input */}
      <InputField
        label="Förnamn"
        id="shippingAdress.firstName"
        name="shippingAdress.firstName"
        type="text"
        value={values.shippingAdress.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.firstName &&
          !!errors.shippingAdress?.firstName
        }
        helperText={
          touched.shippingAdress?.firstName && errors.shippingAdress?.firstName
        }
      />

      {/* Last name input */}
      <InputField
        label="Efternamn"
        id="shippingAdress.lastName"
        name="shippingAdress.lastName"
        type="text"
        value={values.shippingAdress.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.lastName && !!errors.shippingAdress?.lastName
        }
        helperText={
          touched.shippingAdress?.lastName && errors.shippingAdress?.lastName
        }
      />

      {/* Street adress input */}
      <InputField
        label="Postadress"
        id="shippingAdress.streetAdress"
        name="shippingAdress.streetAdress"
        type="text"
        value={values.shippingAdress.streetAdress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.streetAdress &&
          !!errors.shippingAdress?.streetAdress
        }
        helperText={
          touched.shippingAdress?.streetAdress &&
          errors.shippingAdress?.streetAdress
        }
      />

      {/* Post code input */}
      <InputField
        label="Postnummer"
        id="shippingAdress.postCode"
        name="shippingAdress.postCode"
        type="text"
        value={values.shippingAdress.postCode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.postCode && !!errors.shippingAdress?.postCode
        }
        helperText={
          touched.shippingAdress?.postCode && errors.shippingAdress?.postCode
        }
      />

      {/* city input */}
      <InputField
        label="Stad"
        id="shippingAdress.city"
        name="shippingAdress.city"
        type="text"
        value={values.shippingAdress.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.shippingAdress?.city && !!errors.shippingAdress?.city}
        helperText={touched.shippingAdress?.city && errors.shippingAdress?.city}
      />

      {/* phone number input */}
      <InputField
        label="Telefonnummer"
        id="shippingAdress.phoneNumber"
        name="shippingAdress.phoneNumber"
        type="text"
        value={values.shippingAdress.phoneNumber}
        onChange={(e) => {
          handleChange(e);
          // checks if other number is filled in under swish, won't overwrite.
          if (!props.formikProps.values.phoneNumber) {
            // adds phonenumber to swish if swishnumber is empty
            props.formikProps.setFieldValue("phoneNumber", e.target.value);
          }
        }}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.phoneNumber &&
          !!errors.shippingAdress?.phoneNumber
        }
        helperText={
          touched.shippingAdress?.phoneNumber &&
          errors.shippingAdress?.phoneNumber
        }
      />

      {/* email adress input */}
      <InputField
        label="E-postadress"
        id="shippingAdress.emailAdress"
        name="shippingAdress.emailAdress"
        type="text"
        value={values.shippingAdress.emailAdress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.shippingAdress?.emailAdress &&
          !!errors.shippingAdress?.emailAdress
        }
        helperText={
          touched.shippingAdress?.emailAdress &&
          errors.shippingAdress?.emailAdress
        }
      />
    </>
  );
}

export default ShippingForm;
