import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        e.target.value
          ? setFastWeight(parseInt(e.target.value))
          : setFastWeight(0);
        break;
      case 'SlowSMA':
        e.target.value
          ? setSlowWeight(parseInt(e.target.value))
          : setSlowWeight(0);
        break;
      case 'FasterSlowSMA':
        e.target.value
          ? setFastToSlowWeight(parseInt(e.target.value))
          : setFastToSlowWeight(0);
        break;
      case 'MACD':
        e.target.value
          ? setMACDWeight(parseInt(e.target.value))
          : setMACDWeight(0);
        break;
      case 'ADX':
        e.target.value
          ? setADXWeight(parseInt(e.target.value))
          : setADXWeight(0);
        break;
    }
  };

  const handleBlur = () => {
    let newWeightObject = {
      fastWeight: fastWeight,
      slowWeight: slowWeight,
      fastToSlowWeight: fastToSlowWeight,
      MACDWeight: MACDWeight,
      ADXWeight: ADXWeight,
    };
    onWeightChange(newWeightObject);
  };

  return (
    <Grid container direction='row'>
      <Row className='mt-3 ml-1'>
        {error && (
          <div class='alert alert-danger p-1' role='alert'>
            <strong>{errorMessage}</strong>
          </div>
        )}
      </Row>
      <Grid item>
        <Grid container direction='column'>
          <h3>Moving Averages</h3>
          <Form.Group controlId='FastSMA'>
            <Form.Label>Fast</Form.Label>
            <Form.Control
              type='input'
              value={fastWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='SlowSMA'>
            <Form.Label>Slow</Form.Label>
            <Form.Control
              type='input'
              value={slowWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='FasterSlowSMA'>
            <Form.Label>Faster > Slow </Form.Label>
            <Form.Control
              type='input'
              value={fastToSlowWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Grid>
      </Grid>
      <Grid item>
        <Col>
          <h3>Other</h3>
          <Form.Group controlId='MACD'>
            <Form.Label>Weekly MACD Pos. Crossover</Form.Label>
            <Form.Control
              type='input'
              value={MACDWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='ADX'>
            <Form.Label>ADX</Form.Label>
            <Form.Control
              type='input'
              value={ADXWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Col>
      </Grid>
    </Grid>
  );
};

export default Weighting;
