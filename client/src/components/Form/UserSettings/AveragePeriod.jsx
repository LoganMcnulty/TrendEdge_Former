import React, { useEffect, useState} from 'react';
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

  const handleFastChange = e => {
    setFastSMA(parseInt(e.target.value));
    onFastSMAChange(parseInt(e.target.value));
  };

  const handleFastSliderChange = (event, newValue) => {
    setFastSMA(parseInt(newValue));
    onFastSMAChange(parseInt(newValue));
  };

  const handleFastBlur = () => {
    if (fastSMA < 2) {
      setFastSMA(2);
      onFastSMAChange(2);
    } else if (fastSMA > 40) {
      setFastSMA(40);
      onFastSMAChange(40);
    }
  };

  const handleSlowChange = e => {
    setSlowSMA(parseInt(e.target.value));
    onSlowSMAChange(parseInt(e.target.value));
  };

  const handleSlowSliderChange = (event, newValue) => {
    setSlowSMA(parseInt(newValue));
    onSlowSMAChange(parseInt(newValue));
  };

  const handleSlowBlur = () => {
    if (slowSMA < 10) {
      setSlowSMA(10);
      onSlowSMAChange(10);
    } else if (slowSMA > 200) {
      setSlowSMA(200);
      onSlowSMAChange(200);
    }
  };

  const handleLookbackChange = e => {
    setLookback(parseInt(e.target.value));
    onLookbackChange(parseInt(e.target.value));
  };

  const handleLookbackSliderChange = (event, newValue) => {
    setLookback(parseInt(newValue));
    onLookbackChange(parseInt(newValue));
  };

  const handleLookbackBlur = () => {
    if (lookback < 1) {
      setLookback(1);
      onLookbackChange(1);
    } else if (lookback > 40) {
      setLookback(40);
      onLookbackChange(40);
    }
  };

  return (
    <Grid container item direction='column' spacing={2}>
      <Grid container item direction='row' spacing={2}>
        <Grid item>
          <Typography variant='h5'>Fast SMA:</Typography>
        </Grid>
        <Grid item style={{ width: 200 }}>
          <Slider
            value={typeof fastSMA === 'number' ? fastSMA : 0}
            onChange={handleFastSliderChange}
            min={2}
            max={40}
            aria-labelledby='input-slider'
          />
        </Grid>
        <Grid item>
          <Input
            value={fastSMA}
            margin='dense'
            onChange={handleFastChange}
            style={{ width: 50 }}
            onBlur={handleFastBlur}
            inputProps={{
              step: 2,
              min: 2,
              max: 40,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Grid container item direction='row' spacing={2}>
        <Grid item>
          <Typography variant='h5'>Slow SMA:</Typography>
        </Grid>
        <Grid item>
          <Slider
            value={typeof slowSMA === 'number' ? slowSMA : 0}
            onChange={handleSlowSliderChange}
            style={{ width: 200 }}
            min={10}
            max={200}
            aria-labelledby='input-slider'
          />
        </Grid>
        <Grid item>
          <Input
            value={slowSMA}
            margin='dense'
            onChange={handleSlowChange}
            onBlur={handleSlowBlur}
            style={{ width: 50 }}
            className='text-center'
            inputProps={{
              step: 2,
              min: 10,
              max: 200,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

      {error && (
        <div class='alert alert-danger p-1' role='alert'>
          <strong>{errorMessage}</strong>
        </div>
      )}
      <Grid container item direction='row' spacing={2}>
        <Grid item>
          <Typography variant='h5'>Lookback for SMA Slope:</Typography>
        </Grid>
        <Grid item>
          <Slider
            value={typeof lookback === 'number' ? lookback : 0}
            onChange={handleLookbackSliderChange}
            style={{ width: 200 }}
            min={1}
            max={40}
            aria-labelledby='input-slider'
          />
        </Grid>
        <Grid item>
          <Input
            value={lookback}
            margin='dense'
            onChange={handleLookbackChange}
            style={{ width: 50 }}
            onBlur={handleLookbackBlur}
            inputProps={{
              step: 2,
              min: 1,
              max: 40,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AveragePeriod;
