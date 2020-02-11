import React, { useState } from 'react'
import mediumZoom from 'medium-zoom'
import ImageZoom from './ImageZoom'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import Introduction from './Introduction'
import Formula from './Formula'
import Conclusion from './Conclusion'
import IWM from './IWM'

export const About = () => {
  const zoom = React.useRef(mediumZoom())
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => setPage(value)
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h2' style={{ textAlign: 'center' }}>
            About
          </Typography>
        </Grid>
        <Grid item style={{ height: 900, overflowY: 'scroll' }}>
          {page === 1 ? (
            <Introduction />
          ) : page === 2 ? (
            <IWM />
          ) : page === 3 ? (
            <Formula />
          ) : (
            <Conclusion />
          )}
        </Grid>
        <Grid item>
          <Pagination count={4} page={page} onChange={handleChange} />
        </Grid>
      </Grid>
    </Container>
  )
}
