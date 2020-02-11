import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SignupForm } from 'components'

export function LandingPage() {
  return (
    <Grid container xs={12}>
      <Grid item xs={8}>
        <Grid item>
          <Typography variant='h1'>Welcome to Trend Edge!</Typography>
          <Typography paragraph variant='h3'>
            Trend Edge is where Trend Followers can get a clean summary of the
            state of the trend of the market as a whole.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Card style={styles.signup}>
          <Grid item>
            <SignupForm text={'sign up'} />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

const styles = {
  signup: {
    width: '100%',
    padding: '40px 0',
    position: '-webkit-sticky',
    position: 'sticky',
    top: 100,
  },
}
