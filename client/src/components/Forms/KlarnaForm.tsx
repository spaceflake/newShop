import { FormikProps } from "formik";
import InputField from "./InputField";
import { OrderData } from "./OrderForm";

interface Props {
  formikProps: FormikProps<OrderData>;
}

function KlarnaForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;

  return (
    <>
      {/* Personal number input */}
      <InputField
        label="personnummer: "
        id="personalNumber"
        name="personalNumber"
        type="text"
        value={values.personalNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.personalNumber && !!errors.personalNumber}
        helperText={touched.personalNumber && errors.personalNumber}
      />
    </>
  );
}

export default KlarnaForm;
