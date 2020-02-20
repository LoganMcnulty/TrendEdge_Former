import React, { useState, useEffect, useContext } from 'react';
import UserContext from 'contexts/UserContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AveragePeriod from './AveragePeriod';
import Weighting from './Weighting';

import { updateSettings, getSettings } from 'services/userService';

export function UserSettings() {
  const { user } = useContext(UserContext);
  const [fastSMA, setFastSMA] = useState();
  const [slowSMA, setSlowSMA] = useState();
  const [lookback, setLookback] = useState();
  const [weightObject, setWeightObject] = useState();
  const [currentUserSettings, setcurrentUserSettings] = useState();
  const [SMAError, setSMAError] = useState();
  const [weightError, setWeightError] = useState();

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
    <Grid container direction='column' spacing={5}>
      <Grid item>
        <Typography variant='h3'>User Settings</Typography>
      </Grid>
      <Grid container item direction='row' spacing={6}>
        <Grid item>
          <AveragePeriod
            user={currentUserSettings}
            onFastSMAChange={handleFastSMAChange}
            onSlowSMAChange={handleSlowSMAChange}
            onLookbackChange={handleLookbackChange}
            onError={handleSMAError}
          />
        </Grid>
        <Grid item>
          <Weighting
            user={currentUserSettings}
            onWeightChange={handleWeightChange}
            onError={handleWeightError}
          />
        </Grid>
      </Grid>
      <Grid item>
        {!SMAError && !weightError && (
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save User Options
          </Button>
        )}
        {(SMAError || weightError) && (
          <Button disabled>Save User Options</Button>
        )}
      </Grid>
    </Grid>
  );
}
