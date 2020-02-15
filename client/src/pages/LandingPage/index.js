import React from 'react';
import Grid from '@material-ui/core/Grid';
import { SignupForm } from 'components';
import Header from './Header';
import Summary from './Summary';

export function LandingPage() {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      xs={12}
    >
      <Header />
      <Grid container direction='row' xs={12}>
        <Grid item xs={8}>
          <Summary />
        </Grid>
        <Grid item xs={4}>
          <SignupForm label={'sign up'} />
        </Grid>
      </Grid>
    </Grid>
  );
}
