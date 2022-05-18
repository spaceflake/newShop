import { Formik, Form, Field } from 'formik';
import { Button, Fade, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

const SubscribeSchema = Yup.object().shape({
  email: Yup.string().email('Ogiltig email adress').required('Obligatorisk'),
});

function SubscribeForm() {
  const [state, setState] = useState({
    submitted: false,
    email: '',
  });

  useEffect(() => {
    if (state.submitted === true) {
      setTimeout(() => setState({ submitted: false, email: '' }), 4000);
    }
  }, [state.submitted]);

  return (
    <div>
      <Typography variant="h6">Anmäl dig till vårt nyhetsbrev</Typography>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SubscribeSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          setState({ submitted: true, email: values.email });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" type="email" />
            <Button type="submit">Prenumerera</Button>
            {errors.email && touched.email && <div>{errors.email}</div>}
          </Form>
        )}
      </Formik>
      <Fade in={state.submitted}>
        <Box>Tack för anmälan {state.email}</Box>
      </Fade>
    </div>
  );
}

export default SubscribeForm;
