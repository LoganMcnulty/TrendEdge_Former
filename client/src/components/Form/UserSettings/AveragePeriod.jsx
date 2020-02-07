import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Grid, Slider, Input, Typography } from '@material-ui/core';

const AveragePeriod = ({ user, onFastSMAChange, onSlowSMAChange, onLookbackChange, onError }) => {
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
    } catch (ex) { }
    if (fastSMA > slowSMA) {
      setError(true);
      setErrorMessage("Slow SMA must be larger than Fast SMA");
      onError(true);
    } else {
      setError(false);
      onError(false);
    }
  });


  const handleFastChange = (e) => {
    setFastSMA(parseInt(e.target.value));
    onFastSMAChange(parseInt(e.target.value))
  }

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

  const handleSlowChange = (e) => {
    setSlowSMA(parseInt(e.target.value));
    onSlowSMAChange(parseInt(e.target.value))
  }

  const handleSlowSliderChange = (event, newValue) => {
    setSlowSMA(parseInt(newValue));
    onSlowSMAChange(parseInt(newValue))
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

  const handleLookbackChange = (e) => {
    setLookback(parseInt(e.target.value));
    onLookbackChange(parseInt(e.target.value))
  }

  const handleLookbackSliderChange = (event, newValue) => {
    setLookback(parseInt(newValue));
    onLookbackChange(parseInt(newValue))
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
    <div style={{ width: 400 }}>
      <hr />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <h5>Fast SMA:</h5>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof fastSMA === 'number' ? fastSMA : 0}
            onChange={handleFastSliderChange}
            min={2}
            max={40}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={fastSMA}
            margin="dense"
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
      <hr />
      <Grid container spacing={2} alignItems="center" className="justify-content-center">
        <Grid item>
          <h5>Slow SMA:</h5>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof slowSMA === 'number' ? slowSMA : 0}
            onChange={handleSlowSliderChange}
            min={10}
            max={200}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={slowSMA}
            margin="dense"
            onChange={handleSlowChange}
            onBlur={handleSlowBlur}
            style={{ width: 50 }}
            className="text-center"
            inputProps={{
              step: 2,
              min: 10,
              max: 200,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        {error && (<Grid>
          <div class="alert alert-danger p-1" role="alert">
            <strong>{errorMessage}</strong>
          </div>
        </Grid>
        )}
      </Grid>
      <hr />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <h5>Lookback for SMA Slope:</h5>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof lookback === 'number' ? lookback : 0}
            onChange={handleLookbackSliderChange}
            min={1}
            max={40}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={lookback}
            margin="dense"
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
    </div>
  )

  // return (
  //   <Form>
  //     <fieldset>
  //       <Form.Group>
  //         <Form.Label as='legend'>Fast Moving</Form.Label>
  //         <Col>
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='5'
  //             value='5'
  //             name='fastRadio'
  //             id='fastRadio1'
  //             checked={fastSMA == 5}
  //             onChange={handleFastChange}
  //           />
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='10'
  //             value='10'
  //             name='fastRadio'
  //             id='fastRadio2'
  //             checked={fastSMA == 10}
  //             onChange={handleFastChange}
  //           />
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='15'
  //             value='15'
  //             name='fastRadio'
  //             id='fastRadio3'
  //             checked={fastSMA == 15}
  //             onChange={handleFastChange}
  //           />
  //         </Col>
  //       </Form.Group>
  //     </fieldset>
  //     <fieldset>
  //       <Form.Group>
  //         <Form.Label as='legend'>Slow Moving</Form.Label>
  //         <Col>
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='40'
  //             value='40'
  //             name='slowRadio'
  //             id='slowRadio1'
  //             onChange={handleSlowChange}
  //             checked={slowSMA == 40}
  //           />
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='60'
  //             value='60'
  //             name='slowRadio'
  //             id='slowRadio2'
  //             onChange={handleSlowChange}
  //             checked={slowSMA == 60}
  //           />
  //           <Form.Check
  //             inline
  //             type='radio'
  //             label='80'
  //             value='80'
  //             name='slowRadio'
  //             id='slowRadio3'
  //             onChange={handleSlowChange}
  //             checked={slowSMA == 80}
  //           />
  //         </Col>
  //       </Form.Group>
  //     </fieldset>
  //   </Form>
  // )
}

export default AveragePeriod
