import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { SectorTable } from 'components';

export const Trend = () => {

  const styles = {
    jumbotron: {
      background: '#3f51b5',
      backgroundSize: 'cover',
      backgroundColor: '#4682B4',
      color: 'white',
    },
  };

  return (
    <>
      <Grid item>
        <Box style={styles.jumbotron}>
          <Typography variant='h3'>Sector Dashboard</Typography>
        </Box>
      </Grid>
      <Grid item>
        <SectorTable />
      </Grid>
    </>
  );
};
