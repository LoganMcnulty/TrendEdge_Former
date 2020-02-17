import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import Introduction from './Introduction'
import Formula from './Formula'
import Conclusion from './Conclusion'

export const About = () => {
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => setPage(value)
  return (
    <Container>
      <Grid container spacing={6} direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h2' style={{ textAlign: 'center' }}>
            About
          </Typography>
        </Grid>
        <Grid item style={{ height: 900, overflowY: 'scroll' }}>
          {page === 1 ? (
            <Introduction />
          ) : page === 2 ? (
            <Formula />
          ) : (
            <Conclusion />
          )}
        </Grid>
        <Grid item>
          <Pagination
            count={3}
            page={page}
            onChange={handleChange}
            color='primary'
            size='large'
          />
        </Grid>
      </Grid>
    </Container>
  )
}
