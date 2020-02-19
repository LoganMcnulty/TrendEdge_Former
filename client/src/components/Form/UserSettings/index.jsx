import React, { useState, useEffect, useContext } from 'react';
import UserContext from 'contexts/UserContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AveragePeriod from './AveragePeriod';
import Weighting from './Weighting';
import { updateSettings, getSettings } from 'services/userService';

export function UserSettings() {
  const { user } = useContext(UserContext);
  const [key, setKey] = useState('AveragePeriod');
  const [fastSMA, setFastSMA] = useState();
  const [slowSMA, setSlowSMA] = useState();
  const [lookback, setLookback] = useState();
  const [weightObject, setWeightObject] = useState();
  const [currentUserSettings, setcurrentUserSettings] = useState();
  const [SMAError, setSMAError] = useState();
  const [weightError, setWeightError] = useState();

  useEffect(() => {
    try {
      getSettings(user.email).then(loadUserSettings => {
        if (!weightObject) {
          setFastSMA(loadUserSettings.fastSMA);
          setSlowSMA(loadUserSettings.slowSMA);
          setLookback(loadUserSettings.lookback);
          setWeightObject({
            fastWeight: loadUserSettings.fastWeight,
            slowWeight: loadUserSettings.slowWeight,
            fastToSlowWeight: loadUserSettings.fastToSlowWeight,
            MACDWeight: loadUserSettings.MACDWeight,
            ADXWeight: loadUserSettings.ADXWeight,
          });
          setcurrentUserSettings({
            fastSMA: loadUserSettings.fastSMA,
            slowSMA: loadUserSettings.slowSMA,
            lookback: loadUserSettings.lookback,
            fastWeight: loadUserSettings.fastWeight,
            slowWeight: loadUserSettings.slowWeight,
            fastToSlowWeight: loadUserSettings.fastToSlowWeight,
            MACDWeight: loadUserSettings.MACDWeight,
            ADXWeight: loadUserSettings.ADXWeight,
          });
        }
      });
    } catch (ex) {}
  }, [user]);

  const handleSave = () => {
    const userSettings = {
      ...weightObject,
      fastSMA,
      slowSMA,
      lookback,
    };
    updateSettings(user.email, userSettings);
  };

  const handleWeightChange = newWeightObject => {
    setWeightObject(newWeightObject);
  };

  const handleFastSMAChange = newFastSMA => {
    setFastSMA(newFastSMA);
  };

  const handleSlowSMAChange = newSlowSMA => {
    setSlowSMA(newSlowSMA);
  };

  const handleLookbackChange = newLookback => {
    setLookback(newLookback);
  };

  const handleSMAError = newError => {
    setSMAError(newError);
  };

  const handleWeightError = newError => {
    setWeightError(newError);
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      spacing={3}
    >
      <Grid item>
        <Typography variant='h1'>User Settings</Typography>
      </Grid>
      <Grid item>
        {!SMAError && !weightError && (
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save User Options
          </Button>
        )}
        {(SMAError || weightError) && (
          <Button variant='contained' disabled>
            Save User Options
          </Button>
        )}
      </Grid>
      <Grid item>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey='AveragePeriod' title='Average Period (Weekly)'>
            <AveragePeriod
              user={currentUserSettings}
              onFastSMAChange={handleFastSMAChange}
              onSlowSMAChange={handleSlowSMAChange}
              onLookbackChange={handleLookbackChange}
              onError={handleSMAError}
            />
          </Tab>
          <Tab eventKey='Weighting' title='Weighting (%)'>
            <Weighting
              user={currentUserSettings}
              onWeightChange={handleWeightChange}
              onError={handleWeightError}
            />
          </Tab>
        </Tabs>
      </Grid>
    </Grid>
  );
}
