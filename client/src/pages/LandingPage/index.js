import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './Header'
import SignupSection from './SignupSection'
import Summary from './Summary'

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
          <SignupSection />
        </Grid>
      </Grid>
    </Grid>
  )
}
