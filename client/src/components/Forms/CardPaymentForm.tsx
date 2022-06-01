import { FormikProps } from "formik";
import InputField from "./InputField";
import { OrderData } from "./OrderForm";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

interface Props {
  formikProps: FormikProps<OrderData>;
}

function CardPaymentForm(props: Props) {
  const { values, handleChange, handleBlur, touched, errors } =
    props.formikProps;
  return (
    <>
      {/* Card number input */}
      <InputField
        label="Cardnumber: "
        id="cardNumber"
        name="cardNumber"
        type="text"
        value={values.cardNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.cardNumber && !!errors.cardNumber}
        helperText={touched.cardNumber && errors.cardNumber}
      />

      {/* CVC input */}
      <InputField
        label="Cvc: "
        id="cvc"
        name="cvc"
        type="cvc"
        value={values.cvc}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.cvc && !!errors.cvc}
        helperText={touched.cvc && errors.cvc}
      />

      {/* expiery date input */}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={values.expDate}
          onChange={handleChange}
          label="Expire date:"
          renderInput={(params) => (
            <InputField
              InputLabelProps={{ shrink: true }}
              label={params.label}
              id="expDate"
              name="expDate"
              type="date"
              placeholder="YY-MM-DD"
              onBlur={handleBlur}
              error={touched.expDate && !!errors.expDate}
              onChange={handleChange}
              helperText={touched.expDate && errors.expDate}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
}

export default CardPaymentForm;
