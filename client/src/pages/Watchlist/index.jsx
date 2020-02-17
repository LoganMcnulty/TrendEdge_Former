import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WatchTable } from 'components';

export const Watchlist = ({ user }) => {
  const style = {
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
        <Box className={style.jumbotron}>
          <Typography variant='h4'>Your Watchlist</Typography>
        </Box>
      </Grid>
      <Grid item>
        <WatchTable user={user} />
      </Grid>
    </>
  );
};
