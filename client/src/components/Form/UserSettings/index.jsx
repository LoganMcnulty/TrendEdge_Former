import React, { useState, useEffect, useContext } from 'react';
import UserContext from 'contexts/UserContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AveragePeriod from './AveragePeriod';
import Weighting from './Weighting';
import { updateSettings, getSettings } from 'services/userService';

export function UserSettings() {
  const [key, setKey] = useState('AveragePeriod');
  const [fastSMA, setFastSMA] = useState();
  const [slowSMA, setSlowSMA] = useState();
  const [lookback, setLookback] = useState();
  const [weightObject, setWeightObject] = useState();
  const [currentUserSettings, setcurrentUserSettings] = useState();
  const [SMAError, setSMAError] = useState();
  const [weightError, setWeightError] = useState();
  const { user } = useContext(UserContext);
  useEffect(() => {
    try {
      getSettings(user.email).then(
        ({
          fastSMA,
          slowSMA,
          lookback,
          fastWeight,
          slowWeight,
          fastToSlowWeight,
          MACDWeight,
          ADXWeight,
        }) => {
          if (!weightObject) {
            setFastSMA(fastSMA);
            setSlowSMA(slowSMA);
            setLookback(lookback);
            setWeightObject({
              fastWeight,
              slowWeight,
              fastToSlowWeight,
              MACDWeight,
              ADXWeight,
            });
            setcurrentUserSettings({
              fastSMA,
              slowSMA,
              lookback,
              fastWeight,
              slowWeight,
              fastToSlowWeight,
              MACDWeight,
              ADXWeight,
            });
          }
        }
      );
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
          <Button onClick={handleSave}>Save User Options</Button>
        )}
        {(SMAError || weightError) && (
          <Button disabled>Save User Options</Button>
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
