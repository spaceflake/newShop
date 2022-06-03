import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUser } from "../../contexts/UserContext";
import InputField from "./InputField";
import axios, { AxiosResponse } from "axios";

type SignUpDetailsSchemaType = Record<keyof SignUpDetails, Yup.AnySchema>;

const SignUpFormSchema = Yup.object().shape<SignUpDetailsSchemaType>({
  firstName: Yup.string().required("Please enter your firstname."),
  lastName: Yup.string().required("Please enter your lastname."),
  email: Yup.string().required("Please enter your email."),
  password: Yup.string().required("Please enter your password."),
});

export interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Props {
  defaultLoginDetails?: SignUpDetails;
}

const emptyForm: SignUpDetails = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function SignUpForm(_props: Props) {
  // const userContext = useUser()
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  let nav = useNavigate();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik<SignUpDetails>({
      initialValues: emptyForm,
      validationSchema: SignUpFormSchema,
      onSubmit: (SignUpDetails, { resetForm }) => {
        setSubmitError(undefined);
        const userRegister = async () => {
          await axios
            .post(
              "http://localhost:4000/api/user/register",
              {
                ...SignUpDetails,
              },
              {
                withCredentials: true,
              }
            )
            .then(
              (res: AxiosResponse) => {
                console.log("user has been registerd ");
                console.log(res);
                console.log(SignUpDetails);

                nav("/");
                resetForm();
              },
              () => {
                console.log("failed to register");
              }
            );
        };
        userRegister();
      },
    });

  return (
    // Log-in form
    <form onSubmit={handleSubmit}>
      {/* Display error if invalid input */}
      {!!submitError && (
        <Typography sx={{ color: "red" }}>{submitError}</Typography>
      )}

      {/* firstName name input */}
      <InputField
        label="Firstname: "
        id="firstName"
        name="firstName"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName}
        required
      />
      {/* lastName input */}
      <InputField
        label="Lastname: "
        id="lastName"
        name="lastName"
        type="text"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName}
        required
      />
      {/* email input */}
      <InputField
        label="Email: "
        id="email"
        name="email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        required
      />

      {/* Password input */}
      <InputField
        label="Password: "
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        required
      />

      <Button
        variant="outlined"
        type="submit"
        sx={{
          marginTop: '1rem',
          height: "3rem",
          bgcolor: "#ED6C02",
          border: "none",
          color: " white",
          "&:hover": {
            bgcolor: '#181818',
            color: 'white',
          },
          '@media screen and (max-width: 440px)': {
            mt: 2,
            mb: 0,
          },
        }}
      >
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
