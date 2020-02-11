import React from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { SignupForm } from 'components'

const useStyles = makeStyles(theme => ({
  signup: {
    padding: 40,
  },
}))

const SignupSection = () => {
  const classes = useStyles()
  return (
    <Card className={classes.signup}>
      <SignupForm label={'sign up'} />
    </Card>
  )
}

export default SignupSection
