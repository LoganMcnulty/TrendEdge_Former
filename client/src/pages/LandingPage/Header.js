import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Header = () => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Divider className={classes.divider} />
      <Typography variant='h1'>Trend Edge</Typography>
      <Divider className={classes.divider} />
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  divider: {
    height: 10,
    margin: 100,
  },
}))

export default Header
