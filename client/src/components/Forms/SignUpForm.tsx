import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../../contexts/UserContext';
import InputField from './InputField';
import axios, { AxiosResponse } from 'axios';

type SignUpDetailsSchemaType = Record<keyof SignUpDetails, Yup.AnySchema>;

const SignUpFormSchema = Yup.object().shape<SignUpDetailsSchemaType>({
  firstName: Yup.string().required('pleas inter your first name.'),
  lastName: Yup.string().required('pleas inter your last name.'),
  email: Yup.string().required('pleas inter your email.'),
  password: Yup.string().required('pleas inter your password.'),
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
  firstName: '',
  lastName: '',
  email: '',
  password: '',
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
              'http://localhost:4000/api/user/register',
              {
                ...SignUpDetails,
              },
              {
                withCredentials: true,
              }
            )
            .then(
              (res: AxiosResponse) => {
                console.log('user has been registerd ');
                console.log(res);
                console.log(SignUpDetails);

                nav('/');
                resetForm();
              },
              () => {
                console.log('failed to register');
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
        <Typography sx={{ color: 'red' }}>{submitError}</Typography>
      )}

      {/* firstName name input */}
      <InputField
        label="First name: "
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
        label="Last name: "
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
        label="email: "
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
          mt: 2,
          mb: 2,
          height: '3rem',
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
      >
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
