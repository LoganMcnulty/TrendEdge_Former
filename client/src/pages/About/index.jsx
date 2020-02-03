import React from 'react'
import mediumZoom from 'medium-zoom'
import ImageZoom from './ImageZoom'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Iwm from './img/IWM.png'
import Gme from './img/GME.png'
import Qqq from './img/qqq.png'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1200px',
    height: '800px'
  },
  paper: {
    position: 'absolute',
    width: 1300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const styles = {
  header: {
    textAlign: 'center',
    fontSize: '400%',
    margin: '5% 0'
  },
  paragraph: {
    marginTop: '1%',
    fontFamily: "'Roboto', serif",
    fontSize: '20px',
    paddingLeft: '1em'
  },
  subHeader: {
    marginTop: '2%',
    fontWeight: 'bold'
    // textAlign: "center"
  },
  quote: {
    padding: '.5em 0 0 3em',
    fontWeight: '100',
    fontSize: '20px',
    fontStyle: 'italic'
  },
  note: {
    padding: '0 0 0 3em',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
}

export const About = () => {
  const classes = useStyles()
  const zoom = React.useRef(mediumZoom())

  return (
    <div>
      <Paper elevation={6} style={{ marginBottom: '2%' }}>
        <div className='container fluid'>
          <div className='row justify-content-center'>
            <div className='col-lg-6'>
              <h1 style={styles.header}>Trend Health Scoring</h1>
            </div>
          </div>

          <div className='row justify-content-center'>
            <div className='col-lg-12'>
              <div className='row justify-content-center'>
                <div className='col-lg-10'>
                  <p style={styles.paragraph}>
                    Trend Health is a stock market trend monitoring system that
                    applies user-defined weightings to a combination of
                    customizable technical indicators in order to derive a
                    single trend score.
                  </p>
                </div>
              </div>

              <h2 style={styles.subHeader}>
                Market Leadership and Trends in Price
              </h2>

              <blockquote style={styles.quote}>
                “Watch the Market leaders, the stocks that have led the charge
                upward in a bull market [...] as the leaders go, so goes the
                entire market.” - Jesse Livermore
              </blockquote>

              <p style={styles.paragraph}>
                In investing and speculating in stocks, one can keep a pulse on
                the health of the market as a whole by monitoring the trends in
                the price of the current leading sectors and individual stocks.
                It is common practice to determine the state of a trend (up,
                down, sideways) via the use of technical indicators;{' '}
                <a
                  href='https://www.investopedia.com/terms/m/movingaverage.asp'
                  target='_blank'
                >
                  Moving Averages,
                </a>{' '}
                and the{' '}
                <a
                  href='https://www.investopedia.com/terms/m/macd.asp'
                  target='_blank'
                >
                  MACD (Moving Average Convergence/Divergence Oscillator)
                </a>
                , to name two.
              </p>
              <p style={styles.paragraph}>
                Figure 1 is a price history chart of the IWM Small Cap (Cap =
                Market Capitalization. The value of a stock or index, calculated
                by multiplying the number of shares outstanding by the share
                price) index, ranging from Q’1 2014 to Q’1 2020. Each bar on the
                chart represents one week of price movement. The blue line is
                the 10 period moving average (MA), and the red is the 40 period
                MA. The indicator in the middle pane represents MACD, and the
                bottom pane represents ADX (Average Directional Index, discussed
                later)
              </p>

              <ImageZoom
                src={Iwm}
                alt='Zoom 1'
                zoom={zoom.current}
                background='#000'
              />

              <p style={styles.paragraph}>
                In Figure 1, inferences about the trend of the index can be made
                by observing the state of the MAs and MACD. During periods in
                which the price of the index is trending up, the “Fast” (10
                period), and “Slow” (40 period) MAs have a positive slope, and
                the Fast MA is above (i.e. maintains a higher value than) the
                Slow MA. During periods in which the market begins to correct or
                trade sideways, these indicators fail to maintain a positive
                slope.{' '}
              </p>
              <p style={styles.paragraph}>
                The MACD indicator is more sensitive than the MA, and thus more
                widely used for shorter term trends in price. Whereas MAs are a
                simple way to track a trend over longer time frames.{' '}
              </p>
              <p style={styles.paragraph}>
                Provided these indicators, a single score applicable to all
                stocks and sectors (via the sectors’ ETFs [exchange traded
                funds]) can be formulated to reflect the current state of their
                trends. Leading stocks and sectors historically begin to “roll
                over” one by one ahead of market corrections, and their
                formulated scores should reflect this assumption through time.
              </p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={6} style={{ marginBottom: '2%' }}>
        <div className='container fluid'>
          <div className='row justify-content-center'>
            <div className='col-lg-12'>
              <h2 style={styles.subHeader}>A Simple Formula</h2>
              <p style={styles.paragraph}>
                The answers to the questions addressing the state of the
                technical indicators (“Does the fast MA have a positive slope?”,
                “Does the slow MA have a positive slope?”, “Is the fast MA
                greater than the slow MA?”, and “Does the MACD have a positive
                slope?”), are binary values, yes or no (1 or 0). By applying a
                weight to these binary values (for now, assume 25%) a rating
                ranging from 0 to 100% can be expressed. A problem emerges from
                using only these four binary values, in that during bull markets
                (periods in which the market as a whole is trending up), the
                majority of stocks will have a score of 100%.{' '}
              </p>
              <p style={styles.note}>
                Note: Currently, the lookback period for determining
                positive/negative slope is 1, this will be enhanced in future
                builds of Trend Health.{' '}
              </p>
              <p style={styles.note}>
                Additionally, the fast and slow SMA periodicities have default
                values of 10 and 40, but can be modified by the user in their
                user settings.{' '}
              </p>
              <p style={styles.paragraph}>
                In order to differentiate between two stocks trending at/towards
                all time highs, the ADX indicator can be incorporated into the
                trend formula. Designed by Welles Wilder, the{' '}
                <a
                  href='https://www.investopedia.com/terms/a/adx.asp'
                  target='_blank'
                >
                  Average Directional Index (ADX)
                </a>
                , is a technical indicator used to determine the strength of a
                trend. The maximum value of the index is 100. A higher value
                represents a stronger trend, and the values are absolute. For
                example, a stock that has been trending downwards at/towards all
                time lows can have an ADX equal to that of a stock that is
                trending at/towards all time highs.{' '}
              </p>
              <p style={styles.paragraph}>
                Refer to Figures 2 & 3. GameStop (GME) has a weekly ADX of 22.78
                as it trends towards new lows, while the Nasdaq 100 Index (QQQ)
                has a similar weekly ADX of 21.85 while it is trending at all
                time highs.
              </p>

              <div className='row justicy-content-center'>
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
              </div>

              <p style={styles.paragraph}>
                By incorporating ADX into the Trend Health formula (ADX Value *
                Weighting), a differentiation between the strength of two stocks
                trending at/towards all time highs can be made. Given that this
                application aims to measure the health (positivity) of trends,
                the ADX value is only included in the formula when the user
                defined Slow-MA has a positive slope.{' '}
              </p>
              <p style={styles.note}>
                Note: In the application, all five measures of the trend have
                default weightings of 20%. The user has the liberty to modify
                these weightings in their user settings. Should a user believe
                that the only relevant measure of a trend’s health is a positive
                sloping Slow MA, they can set the weighting to be 100%, and the
                remaining indicators will not be factored in.
              </p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={6} style={{ marginBottom: '2%' }}>
        <div className='container fluid'>
          <div className='row justify-content-center'>
            <div className='col-lg-12'>
              <h2 style={styles.subHeader}>Conclusion</h2>
              <p style={styles.paragraph}>
                The goal of Trend Health is not to make recommendations of which
                sectors or stocks to buy based on their score. The application
                specifically allows the user to modify the Fast and Slow MA
                periods and technical indicator weightings, in order to reduce
                Trend Health’s subjectivity to a minimum.
              </p>
              <p style={styles.note}>
                Note: In future builds of Trend Health, additional technical
                indicators and customization methods will be implemented.{' '}
              </p>
              <p style={styles.paragraph}>
                Rather, the goal of Trend Health is to be a place where Trend
                Followers can glance at a single page application and get a
                clean summary of the status of the market and their watchlist of
                stocks and sectors. It has been shown that the bulk of returns
                in the stock market are made over longer term holding periods. A
                Trend Follower with the knowledge that their portfolio holdings
                maintain positive scores is less likely to sell early in a bull
                market, and conversely just as likely to know when not to be
                holding at all.{' '}
              </p>
              <blockquote style={styles.quote}>
                “It is one of the great paradoxes of the stock market that what
                seems too high usually goes higher and what seems too low
                usually goes lower” - William J. Oneil. Founder, Investor’s
                Business Daily
              </blockquote>
              <br></br>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
