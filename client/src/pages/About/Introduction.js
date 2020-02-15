import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Livermore from './Livermore';
import IWM from './IWM';

export default function Introduction() {
  return (
    <Grid
      container
      direction='column'
      justify='space-around'
      alignItems='center'
      spacing={2}
      xs={12}
    >
      <Grid item>
        <Typography variant='h4'>
          Market Leadership and Trends in Price
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={4}>
        <Livermore />
      </Grid>
      <Grid item xs={8}>
        <Typography paragraph variant='h5'>
          In investing and speculating in stocks, one can keep a pulse on the
          health of the market as a whole by monitoring the trends in the price
          of the current leading sectors and individual stocks.
        </Typography>
        <Typography paragraph variant='h5'>
          It is common practice to determine the state of a trend (up, down,
          sideways) via the use of technical indicators such as:{' '}
        </Typography>
        <Typography paragraph variant='h5'>
          <a
            href='https://www.investopedia.com/terms/m/movingaverage.asp'
            target='_blank'
            rel='noopener noreferrer'
          >
            Moving Averages
          </a>
        </Typography>
        <Typography paragraph variant='h5'>
          <a
            href='https://www.investopedia.com/terms/m/macd.asp'
            target='_blank'
            rel='noopener noreferrer'
            title='Moving Average Convergence/Divergence Oscillator'
          >
            MACD
          </a>
        </Typography>
      </Grid>
      <Grid item>
        <IWM />
      </Grid>
    </Grid>
  );
}
