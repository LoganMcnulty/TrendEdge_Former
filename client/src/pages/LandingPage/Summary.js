import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  underline: {
    textDecoration: 'underline',
  },
}))

const Summary = () => {
  const classes = useStyles()
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography paragraph variant='h5'>
          While investing stocks, one can use several methods to monitor market
          trends.
        </Typography>
      </Grid>
      <Grid item>
        <Typography paragraph variant='h5'>
          <strong>Trend Edge </strong> aims to simplify those methods by
          distilling them down to a{' '}
          <span className={classes.underline}>single score</span>.
        </Typography>
      </Grid>
      <Grid item>
        <Button href='About' color='secondary' variant='contained'>
          Learn More
        </Button>
      </Grid>
    </Grid>
  )
}

export default Summary
