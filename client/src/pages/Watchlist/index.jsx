import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { WatchTable } from 'components'

export const Watchlist = ({ user }) => {
  return (
    <>
      <Box bgcolor='primary.main' color='primary.contrastText' p={4} mb={5}>
        <Typography variant='h3'>Watch List</Typography>
      </Box>
      <WatchTable user={user} />
    </>
  )
}
