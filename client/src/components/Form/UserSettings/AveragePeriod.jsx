import React, { useEffect, useState } from 'react';
import { Grid, Slider, Input, Typography } from '@material-ui/core';

const AveragePeriod = ({
  user,
  onFastSMAChange,
  onSlowSMAChange,
  onLookbackChange,
  onError,
}) => {
  const [fastSMA, setFastSMA] = useState();
  const [slowSMA, setSlowSMA] = useState();
  const [lookback, setLookback] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    try {
      if (!fastSMA && !slowSMA) {
        setFastSMA(user.fastSMA);
        setSlowSMA(user.slowSMA);
        setLookback(user.lookback);
        onFastSMAChange(user.fastSMA);
        onSlowSMAChange(user.slowSMA);
        onLookbackChange(user.lookback);
      }
    } catch (ex) {}
    if (fastSMA > slowSMA) {
      setError(true);
      setErrorMessage('Slow SMA must be larger than Fast SMA');
      onError(true);
    } else {
      setError(false);
      onError(false);
    }
  });

  const handleFastChange = (event, newValue) => {
    setFastSMA(newValue);
    onFastSMAChange(newValue);
  };

  const handleSlowChange = (event, newValue) => {
    setSlowSMA(newValue);
    onSlowSMAChange(newValue);
  };

  const handleLookbackChange = (event, newValue) => {
    setLookback(newValue);
    onLookbackChange(newValue);
  };

  return (
    <Grid container item direction='column' spacing={6}>
      <Grid item>
        <Typography variant='h5' >
          Fast SMA
        </Typography>
      </Grid>
      <Grid item>
        <Slider
          defaultValue={10}
          style={{ width: 200 }}
          value={typeof fastSMA === 'number' ? fastSMA : 0}
          onChange={handleFastChange}
          min={2}
          max={40}
          valueLabelDisplay='on'
          aria-labelledby='input-slider'
        />
      </Grid>

      <Grid item>
        <Typography variant='h5' >
          Slow SMA
        </Typography>
      </Grid>
      <Grid item>
        <Slider
          defaultValue={40}
          value={typeof slowSMA === 'number' ? slowSMA : 0}
          onChange={handleSlowChange}
          style={{ width: 200 }}
          min={fastSMA}
          max={200}
          aria-labelledby='input-slider'
          valueLabelDisplay='on'
        />
      </Grid>

      {error && (
        <div class='alert alert-danger p-1' role='alert'>
          <strong>{errorMessage}</strong>
        </div>
      )}

      <Grid item>
        <Typography variant='h5' >
          Lookback for SMA Slope
        </Typography>
      </Grid>
      <Grid item>
        <Slider
          defaultValue={1}
          value={typeof lookback === 'number' ? lookback : 0}
          onChange={handleLookbackChange}
          style={{ width: 200 }}
          min={1}
          max={40}
          aria-labelledby='input-slider'
          valueLabelDisplay='on'
        />
      </Grid>
    </Grid>
  );
};

export default AveragePeriod;
