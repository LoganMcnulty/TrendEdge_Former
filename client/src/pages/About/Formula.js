import React from 'react';
import Typography from '@material-ui/core/Typography';
import ImageZoom from './ImageZoom';
import mediumZoom from 'medium-zoom';
import Gme from './img/GME.png';
import Qqq from './img/qqq.png';

export default function Formula() {
  const zoom = React.useRef(mediumZoom());
  return (
    <>
      <Typography gutterBottom variant='h3'>
        A Simple Formula
      </Typography>
      <Typography paragraph>
        The answers to the questions addressing the state of the technical
        indicators (“Does the fast MA have a positive slope?”, “Does the slow MA
        have a positive slope?”, “Is the fast MA greater than the slow MA?”, and
        “Does the MACD have a positive slope?”), are binary values, yes or no (1
        or 0). By applying a weight to these binary values (for now, assume 25%)
        a rating ranging from 0 to 100% can be expressed. A problem emerges from
        using only these four binary values, in that during bull markets
        (periods in which the market as a whole is trending up), the majority of
        stocks will have a score of 100%.
      </Typography>
      <Typography>
        <strong>Note: </strong>
        Currently, the lookback period for determining positive/negative slope
        is 1, this will be enhanced in future builds of Trend Health.
      </Typography>
      <Typography>
        Additionally, the fast and slow SMA periodicities have default values of
        10 and 40, but can be modified by the user in their user settings.
      </Typography>
      <Typography>
        In order to differentiate between two stocks trending at/towards all
        time highs, the ADX indicator can be incorporated into the trend
        formula. Designed by Welles Wilder, the
        <a
          href='https://www.investopedia.com/terms/a/adx.asp'
          target='_blank'
          rel='noopener noreferrer'
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
        trends towards new lows, while the Nasdaq 100 Index (QQQ) has a similar
        weekly ADX of 21.85 while it is trending at all time highs.
      </Typography>

      <ImageZoom src={Gme} alt='Zoom 2' zoom={zoom.current} background='#000' />
      <ImageZoom src={Qqq} alt='Zoom 3' zoom={zoom.current} background='#000' />

      <Typography>
        By incorporating ADX into the Trend Health formula (ADX Value *
        Weighting), a differentiation between the strength of two stocks
        trending at/towards all time highs can be made. Given that this
        application aims to measure the health (positivity) of trends, the ADX
        value is only included in the formula when the user defined Slow-MA has
        a positive slope.
      </Typography>
      <Typography>
        Note: In the application, all five measures of the trend have default
        weightings of 20%. The user has the liberty to modify these weightings
        in their user settings. Should a user believe that the only relevant
        measure of a trend’s health is a positive sloping Slow MA, they can set
        the weighting to be 100%, and the remaining indicators will not be
        factored in.
      </Typography>
    </>
  );
}
