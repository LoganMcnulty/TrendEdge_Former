import React, { useEffect, useState, useReducer } from 'react';
import UserContext from 'contexts/UserContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    <Form>
      <Row className='mt-3 ml-1'>
        {error && (
          <div class='alert alert-danger p-1' role='alert'>
            <strong>{errorMessage}</strong>
          </div>
        )}
      </Row>
      <Row>
        <Col>
          <h3>Moving Averages</h3>
          <Form.Group controlId='FastSMA'>
            <Form.Label>Fast</Form.Label>
            <Form.Control
              type='number'
              required
              value={fastWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='SlowSMA'>
            <Form.Label>Slow</Form.Label>
            <Form.Control
              type='number'
              required
              value={slowWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='FasterSlowSMA'>
            <Form.Label>Faster > Slow </Form.Label>
            <Form.Control
              type='number'
              required
              value={fastToSlowWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Col>
        <Col>
          <h3>Other</h3>
          <Form.Group controlId='MACD'>
            <Form.Label>Weekly MACD Pos. Crossover</Form.Label>
            <Form.Control
              type='number'
              required
              value={MACDWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId='ADX'>
            <Form.Label>ADX</Form.Label>
            <Form.Control
              type='number'
              required
              value={ADXWeight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Weighting;
