import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AveragePeriod from './AveragePeriod';
import Weighting from './Weighting';
import { updateSettings, getSettings } from 'services/userService';

export function UserSettings({ user }) {
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
      fastSMA: fastSMA,
      slowSMA: slowSMA,
      lookback: lookback,
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
    <Grid container item direction='column'>
      <Grid item>
        <Typography variant='h5'>User Settings</Typography>
      </Grid>
      <Grid item>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey='AveragePeriod' title='Average Period'>
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
      <Grid item>
        {!SMAError && !weightError && (
          <Button className='btn btn-primary' onClick={handleSave}>
            Save User Options
          </Button>
        )}
        {(SMAError || weightError) && (
          <Button className='btn btn-danger' disabled={true}>
            Save User Options
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
