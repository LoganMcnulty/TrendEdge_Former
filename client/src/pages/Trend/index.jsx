import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { SectorTable } from 'components'

export const Trend = ({ sectorHealthDataPass, user }) => {
  const sectorHealthData = sectorHealthDataPass

  if (!sectorHealthDataPass) {
    return null
  }

  return (
    <>
      <Box bgcolor='primary.main' color='primary.contrastText' p={4} mb={5}>
        <Typography variant='h3'>Sector Health Dashboard</Typography>
      </Box>

      <SectorTable user={user} sectorHealthData={sectorHealthData} />
    </>
  )
}
