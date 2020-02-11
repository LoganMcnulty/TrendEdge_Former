import React from 'react'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default function Conclusion() {
  return (
    <Grid item>
      <Typography variant='h3'>Conclusion</Typography>
      <Divider />
      <Typography paragraph variant='h5'>
        The goal of Trend Health is not to make recommendations of which sectors
        or stocks to buy based on their score. The application specifically
        allows the user to modify the Fast and Slow MA periods and technical
        indicator weightings, in order to reduce Trend Health’s subjectivity to
        a minimum.
      </Typography>
      <Typography paragraph variant='h5'>
        Rather, the goal of Trend Health is to be a place where Trend Followers
        can glance at a single page application and get a clean summary of the
        status of the market and their watchlist of stocks and sectors. It has
        been shown that the bulk of returns in the stock market are made over
        longer term holding periods. A Trend Follower with the knowledge that
        their portfolio holdings maintain positive scores is less likely to sell
        early in a bull market, and conversely just as likely to know when not
        to be holding at all.
      </Typography>
      <Typography variant='h5'>
        “It is one of the great paradoxes of the stock market that what seems
        too high usually goes higher and what seems too low usually goes lower”
        - William J. Oneil. Founder, Investor’s Business Daily
      </Typography>
    </Grid>
  )
}
