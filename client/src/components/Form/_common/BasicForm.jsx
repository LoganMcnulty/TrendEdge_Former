import React from 'react';
import { Form, Field } from 'formik';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Input from './Input';

const BasicForm = ({ label }) => {
  return (
    <Form>
      <Grid container direction='column' justify='space-between' spacing={3}>
        <Grid item>
          <Field
            type='email'
            name='email'
            label='Email Address'
            component={Input}
          />
        </Grid>
        <Grid item>
          <Field
            type='password'
            name='password'
            label='Password'
            autoComplete='none'
            component={Input}
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={styles.btn}
          >
            {label}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default BasicForm;

const styles = {
  btn: {
    width: 300,
  },
};
