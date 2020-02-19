import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Weighting = ({ user, onWeightChange, onError }) => {
  const [fastWeight, setFastWeight] = useState();
  const [slowWeight, setSlowWeight] = useState();
  const [fastToSlowWeight, setFastToSlowWeight] = useState();
  const [MACDWeight, setMACDWeight] = useState();
  const [ADXWeight, setADXWeight] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    try {
      if (
        !fastWeight &&
        !slowWeight &&
        !fastToSlowWeight &&
        !MACDWeight &&
        !ADXWeight
      ) {
        setFastWeight(user.fastWeight);
        setSlowWeight(user.slowWeight);
        setFastToSlowWeight(user.fastToSlowWeight);
        setMACDWeight(user.MACDWeight);
        setADXWeight(user.ADXWeight);
      }
    } catch (ex) {}
    let totalWeight =
      parseInt(fastWeight) +
      parseInt(slowWeight) +
      parseInt(fastToSlowWeight) +
      parseInt(MACDWeight) +
      parseInt(ADXWeight);
    if (totalWeight != 100) {
      setError(true);
      setErrorMessage(
        'Total Weight must equal 100% (currently ' + totalWeight + '%)'
      );
      onError(true);
    } else {
      setError(false);
      onError(false);
    }
  });

  const handleChange = e => {
    switch (e.target.id) {
      case 'FastSMA':
        setFastWeight(e.target.value);
        break;
      case 'SlowSMA':
        setSlowWeight(e.target.value);
        break;
      case 'FasterSlowSMA':
        setFastToSlowWeight(e.target.value);
        break;
      case 'MACD':
        setMACDWeight(e.target.value);
        break;
      case 'ADX':
        setADXWeight(e.target.value);
        break;
    }
  };

  const handleBlur = () => {
    let newWeightObject = {
      fastWeight,
      slowWeight,
      fastToSlowWeight,
      MACDWeight,
      ADXWeight,
    };
    onWeightChange(newWeightObject);
  };

  return (
    <>
      <Grid container item direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h5'>Moving Averages</Typography>
        </Grid>
        <Grid item>
          <TextField
            helperText='Fast'
            id='FastSMA'
            type='number'
            required
            value={fastWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            helperText='Slow'
            id='SlowSMA'
            type='number'
            required
            value={slowWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            helperText='Faster > Slow'
            id='FasterSlowSMA'
            type='number'
            required
            value={fastToSlowWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>

      <Grid container item direction='column' spacing={4}>
        <Grid item>
          <Typography variant='h5'>Other</Typography>
        </Grid>
        <Grid item>
          <TextField
            helperText='MACD'
            id='MACD'
            type='number'
            required
            value={MACDWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            helperText='ADX'
            id='ADX'
            type='number'
            required
            value={ADXWeight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <Grid item>
        {error && (
          <div class='alert alert-danger p-1' role='alert'>
            <strong>{errorMessage}</strong>
          </div>
        )}
      </Grid>
    </>
  );
};

export default Weighting;
