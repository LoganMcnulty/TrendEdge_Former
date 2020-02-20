import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));



export function AddSpinner({ pullStockData, user, addWatchList }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* FIXME:
   *   Fix handlewatchlistadd
   *   add error to spinner - reducer?
   *   make into hook
   */

  const handleWatchlistAdd = e => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      try {
        pullStockData(user.email, addWatchList);
        setSuccess(true);
        setLoading(false);
      } catch {
        alert('error is caught here!');
        setSuccess(false);
        setLoading(false);
      }
    }
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          color='primary'
          className={buttonClassname}
          onClick={handleWatchlistAdd}
        >
          {success ? <CheckIcon /> : <AddIcon />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
}
