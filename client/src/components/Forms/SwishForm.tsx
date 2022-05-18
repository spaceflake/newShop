import { FormikProps } from "formik";
import InputField from "./InputField";
import { OrderData } from "./OrderForm";

interface Props {
  formikProps: FormikProps<OrderData>;
}

function SwishForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;

  return (
    <>
      {/* phone number input */}
      <InputField
        label="telefonnummer: "
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
      />
    </>
  );
}

export default SwishForm;
