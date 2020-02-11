import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ImageZoom from './ImageZoom'
import mediumZoom from 'medium-zoom'
import Iwm from './img/IWM.png'

export default function IWM() {
  const zoom = React.useRef(mediumZoom())
  return (
    <Grid container direction='row' xs={12}>
      <Box style={{ float: 'left', margin: '4px' }}>
        <Grid container direction='column' alignItems='center'>
          <Grid item>
            <Typography variant='h6'>Figure 1</Typography>
          </Grid>
          <Grid item>
            <ImageZoom
              src={Iwm}
              alt='Zoom 1'
              zoom={zoom.current}
              background='#000'
            />
          </Grid>
          <Grid item>
            <Typography variant='caption'>
              Price history chart of{' '}
              <a href='https://finance.yahoo.com/quote/IWM/'>IWM</a>{' '}
              <a href='https://www.investopedia.com/terms/s/small-cap.asp'>
                Small Cap
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography>
        Each bar on the chart represents one week of price movement. The blue
        line is the 10 period moving average (MA), and the red is the 40 period
        MA. The indicator in the middle pane represents MACD, and the bottom
        pane represents ADX (Average Directional Index, discussed later) In
        Figure 1, inferences about the trend of the index can be made by
        observing the state of the MAs and MACD. During periods in which the
        price of the index is trending up, the “Fast” (10 period), and “Slow”
        (40 period) MAs have a positive slope, and the Fast MA is above (i.e.
        maintains a higher value than) the Slow MA. During periods in which the
        market begins to correct or trade sideways, these indicators fail to
        maintain a positive slope.
      </Typography>
      <Typography>
        The MACD indicator is more sensitive than the MA, and thus more widely
        used for shorter term trends in price. Whereas MAs are a simple way to
        track a trend over longer time frames. Provided these indicators, a
        single score applicable to all stocks and sectors (via the sectors’ ETFs
        [exchange traded funds]) can be formulated to reflect the current state
        of their trends. Leading stocks and sectors historically begin to “roll
        over” one by one ahead of market corrections, and their formulated
        scores should reflect this assumption through time.
      </Typography>
    </Grid>
  )
}
