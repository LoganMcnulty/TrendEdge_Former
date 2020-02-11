import React from 'react'
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
import { makeStyles } from '@material-ui/core/styles'
import Iwm from './img/IWM.png'
import Gme from './img/GME.png'
import Qqq from './img/qqq.png'

const useStyles = makeStyles(theme => ({
  divider: {
    height: 10,
    margin: 100,
  },
  definition: {
    width: 500,
    fontSize: 24,
  },
  center: {
    textAlign: 'center',
  },
  livermore: {
    width: 300,
  },
}))

export const About = () => {
  const classes = useStyles()
  const zoom = React.useRef(mediumZoom())

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item className={classes.center} xs={12}>
          <Divider className={classes.divider} />
          <Typography variant='h1'>Trend Edge</Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item>
          <Typography paragraph className={classes.definition} xs={12}>
            <strong>Trend Edge</strong> is a stock market trend monitoring
            system that applies user-defined weightings to a combination of
            customizable technical indicators in order to derive a single trend
            score.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h3'>
            Market Leadership and Trends in Price
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.livermore}>
            <Typography gutterBottom variant='h6' className={classes.center}>
              Jesse Livermore
            </Typography>
            <CardMedia
              image='https://pbs.twimg.com/profile_images/1202370756/jesse_livermore.jpg'
              title='Jesse Livermore'
              component='img'
            />
            <Typography paragraph variant='caption'>
              “Watch the Market leaders, the stocks that have led the charge
              upward in a bull market [...] as the leaders go, so goes the
              entire market.”
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.paragraph}>
            In investing and speculating in stocks, one can keep a pulse on the
            health of the market as a whole by monitoring the trends in the
            price of the current leading sectors and individual stocks. It is
            common practice to determine the state of a trend (up, down,
            sideways) via the use of technical indicators;
            <a
              href='https://www.investopedia.com/terms/m/movingaverage.asp'
              target='_blank'
            >
              Moving Averages,
            </a>
            and the
            <a
              href='https://www.investopedia.com/terms/m/macd.asp'
              target='_blank'
            >
              MACD (Moving Average Convergence/Divergence Oscillator)
            </a>
            , to name two.
          </Typography>
        </Grid>

        <ImageZoom
          src={Iwm}
          alt='Zoom 1'
          zoom={zoom.current}
          background='#000'
        />
        <Typography gutterBottom>
          Figure 1 is a price history chart of the IWM Small Cap (Cap = Market
          Capitalization. The value of a stock or index, calculated by
          multiplying the number of shares outstanding by the share price)
          index, ranging from Q’1 2014 to Q’1 2020. Each bar on the chart
          represents one week of price movement. The blue line is the 10 period
          moving average (MA), and the red is the 40 period MA. The indicator in
          the middle pane represents MACD, and the bottom pane represents ADX
          (Average Directional Index, discussed later) In Figure 1, inferences
          about the trend of the index can be made by observing the state of the
          MAs and MACD. During periods in which the price of the index is
          trending up, the “Fast” (10 period), and “Slow” (40 period) MAs have a
          positive slope, and the Fast MA is above (i.e. maintains a higher
          value than) the Slow MA. During periods in which the market begins to
          correct or trade sideways, these indicators fail to maintain a
          positive slope.
        </Typography>
        <Typography gutterBottom variant='body1'>
          The MACD indicator is more sensitive than the MA, and thus more widely
          used for shorter term trends in price. Whereas MAs are a simple way to
          track a trend over longer time frames. Provided these indicators, a
          single score applicable to all stocks and sectors (via the sectors’
          ETFs [exchange traded funds]) can be formulated to reflect the current
          state of their trends. Leading stocks and sectors historically begin
          to “roll over” one by one ahead of market corrections, and their
          formulated scores should reflect this assumption through time.
        </Typography>

        <Typography gutterBottom variant='h3'>
          A Simple Formula
        </Typography>
        <Typography paragraph>
          The answers to the questions addressing the state of the technical
          indicators (“Does the fast MA have a positive slope?”, “Does the slow
          MA have a positive slope?”, “Is the fast MA greater than the slow
          MA?”, and “Does the MACD have a positive slope?”), are binary values,
          yes or no (1 or 0). By applying a weight to these binary values (for
          now, assume 25%) a rating ranging from 0 to 100% can be expressed. A
          problem emerges from using only these four binary values, in that
          during bull markets (periods in which the market as a whole is
          trending up), the majority of stocks will have a score of 100%.
        </Typography>
        <Typography>
          <strong>Note: </strong>
          Currently, the lookback period for determining positive/negative slope
          is 1, this will be enhanced in future builds of Trend Health.
        </Typography>
        <Typography>
          Additionally, the fast and slow SMA periodicities have default values
          of 10 and 40, but can be modified by the user in their user settings.
        </Typography>
        <Typography>
          In order to differentiate between two stocks trending at/towards all
          time highs, the ADX indicator can be incorporated into the trend
          formula. Designed by Welles Wilder, the
          <a
            href='https://www.investopedia.com/terms/a/adx.asp'
            target='_blank'
          >
            Average Directional Index (ADX)
          </a>
          , is a technical indicator used to determine the strength of a trend.
          The maximum value of the index is 100. A higher value represents a
          stronger trend, and the values are absolute. For example, a stock that
          has been trending downwards at/towards all time lows can have an ADX
          equal to that of a stock that is trending at/towards all time highs.
        </Typography>
        <Typography>
          Refer to Figures 2 & 3. GameStop (GME) has a weekly ADX of 22.78 as it
          trends towards new lows, while the Nasdaq 100 Index (QQQ) has a
          similar weekly ADX of 21.85 while it is trending at all time highs.
        </Typography>

        <ImageZoom
          src={Gme}
          alt='Zoom 2'
          zoom={zoom.current}
          background='#000'
        />
        <ImageZoom
          src={Qqq}
          alt='Zoom 3'
          zoom={zoom.current}
          background='#000'
        />

        <Typography>
          By incorporating ADX into the Trend Health formula (ADX Value *
          Weighting), a differentiation between the strength of two stocks
          trending at/towards all time highs can be made. Given that this
          application aims to measure the health (positivity) of trends, the ADX
          value is only included in the formula when the user defined Slow-MA
          has a positive slope.
        </Typography>
        <Typography>
          Note: In the application, all five measures of the trend have default
          weightings of 20%. The user has the liberty to modify these weightings
          in their user settings. Should a user believe that the only relevant
          measure of a trend’s health is a positive sloping Slow MA, they can
          set the weighting to be 100%, and the remaining indicators will not be
          factored in.
        </Typography>

        <Typography variant='h3'>Conclusion</Typography>
        <Typography paragraph>
          The goal of Trend Health is not to make recommendations of which
          sectors or stocks to buy based on their score. The application
          specifically allows the user to modify the Fast and Slow MA periods
          and technical indicator weightings, in order to reduce Trend Health’s
          subjectivity to a minimum.
        </Typography>
        <Typography paragraph>
          Note: In future builds of Trend Health, additional technical
          indicators and customization methods will be implemented.
        </Typography>
        <Typography paragraph>
          Rather, the goal of Trend Health is to be a place where Trend
          Followers can glance at a single page application and get a clean
          summary of the status of the market and their watchlist of stocks and
          sectors. It has been shown that the bulk of returns in the stock
          market are made over longer term holding periods. A Trend Follower
          with the knowledge that their portfolio holdings maintain positive
          scores is less likely to sell early in a bull market, and conversely
          just as likely to know when not to be holding at all.
        </Typography>
        <Typography>
          “It is one of the great paradoxes of the stock market that what seems
          too high usually goes higher and what seems too low usually goes
          lower” - William J. Oneil. Founder, Investor’s Business Daily
        </Typography>
      </Grid>
    </Container>
  )
}
