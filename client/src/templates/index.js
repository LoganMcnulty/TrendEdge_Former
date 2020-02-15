import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { DrawerMenu } from 'components'
import Theme from 'themes'

function Template({ children, user }) {
  const classes = useStyles()
  return (
    <Theme>
      <DrawerMenu user={user}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>{children}</Container>
        </main>
      </DrawerMenu>
    </Theme>
  )
}

export default Template

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))
