import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { createSectors } from '../../../services/createSectors'
import { updateSectorData } from '../../../services/pullSectors'

// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import InboxIcon from '@material-ui/icons/Inbox'
// import DraftsIcon from '@material-ui/icons/Drafts'

export const Filter = props => {
  const classes = useStyles()

  const createSectorsButton = () => {
    createSectors()
  }

  const updateSectorDataButton = () => {
    updateSectorData()
  }

  return (
    <div className={classes.root}>
      {/* <List component='nav' aria-label='main'>
        <ListItem button onClick={createSectorsButton}>
          <ListItemText primary='Create Sectors' style={{background:"red"}}/>
        </ListItem>
      </List>
      <List component='nav' aria-label='main'>
        <ListItem button onClick={updateSectorDataButton}>
          <ListItemText primary='Update Sector Data' style={{background:"red"}}/>
        </ListItem>
      </List> */}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))
