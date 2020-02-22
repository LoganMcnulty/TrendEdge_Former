import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function Theme({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0047AB',
      },
      secondary: {
        main: '#9F002D',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
