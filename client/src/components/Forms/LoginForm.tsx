import { Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useUser } from '../../contexts/UserContext'
import InputField from './InputField'

type LoginDetailsSchemaType = Record<keyof LoginDetails, Yup.AnySchema>

const LoginFormSchema = Yup.object().shape<LoginDetailsSchemaType>({
  email: Yup.string().required('Vänligen fyll i ditt email.'),
  password: Yup.string().required('Vänligen fyll i ditt lösenord.'),
})

export interface LoginDetails {
  email: string
  password: string
}

interface Props {
  defaultLoginDetails?: LoginDetails
}

const emptyForm: LoginDetails = {
  email: '',
  password: '',
}

function LoginForm(_props: Props) {
  const userContext = useUser()
  const [submitError, setSubmitError] = useState<string | undefined>(undefined)
  let nav = useNavigate()

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik<LoginDetails>({
      initialValues: emptyForm,
      validationSchema: LoginFormSchema,
      onSubmit: (loginDetails, { resetForm }) => {
        setSubmitError(undefined)

        // on submit, set user to logged in if successful, navigate back to home
        userContext
        .login(loginDetails)
          .then(() => {
            resetForm()
            nav('/')
            window.location.reload()
          })
          .catch((e) => {
            setSubmitError(e.message)
          })
          console.log(loginDetails);
      },
    })

  return (
    // Log-in form
    <form onSubmit={handleSubmit}>
      {/* Display error if invalid input */}
      {!!submitError && (
        <Typography sx={{ color: 'red' }}>{submitError}</Typography>
      )}

      {/* user name input */}
      <InputField
        label="email: "
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />

      {/* Password input */}
      <InputField
        label="password: "
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && !!errors.password}
        helperText={touched.password && errors.password}
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
        Logga in
      </Button>
    </form>
  )
}

export default LoginForm
