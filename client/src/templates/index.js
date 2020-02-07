import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DrawerMenu } from 'components'
function Template({ children }) {
  const classes = useStyles()
  return (
    <DrawerMenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </DrawerMenu>
  )
}

export default Template

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))
