
import React, { createContext } from 'react';

const SettingsContext = createContext({
  fastSMA: loadUserSettings.fastSMA || 10,
  slowSMA: loadUserSettings.slowSMA || 40,
  lookback: loadUserSettings.lookback || 1,
  fastWeight: loadUserSettings.fastWeight || 20,
  slowWeight: loadUserSettings.slowWeight || 20,
  fastToSlowWeight: loadUserSettings.fastToSlowWeight || 20,
  MACDWeight: loadUserSettings.MACDWeight || 20,
  ADXWeight: loadUserSettings.ADXWeight || 20,
});

export default SettingsContext;
