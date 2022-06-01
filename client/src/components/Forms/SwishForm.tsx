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
        label="Phone number: "
        id="phone"
        name="phone"
        type="text"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />
    </>
  );
}

export default SwishForm;
