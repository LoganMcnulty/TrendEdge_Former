import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { LoginForm, SignupForm } from 'components';

export function DialogForm() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [checked, setChecked] = React.useState(true);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignup = () => {
    setLogin(!login);
  };

  return (
    <>
      <Button variant='outlined' color='inherit' onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-login'
      >
        <DialogContent style={styles.dialog}>
          <Grid
            container
            direction='column'
            justify='space-between'
            spacing={3}
          >
            <Grid item style={styles.center}>
              <Typography variant='h6'>Trend Edge</Typography>
            </Grid>
            <Divider style={styles.divider} flexItem />
            <Grid item style={styles.center}>
              <Typography variant='h6'>{login ? 'Login' : 'Signup'}</Typography>
            </Grid>
            <Grid item>
              {login ? (
                <LoginForm label='login' />
              ) : (
                <SignupForm label='signup' />
              )}
            </Grid>
            {login ? (
              <>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='default'
                        value='default'
                        inputProps={{
                          'aria-label': 'checkbox with default color',
                        }}
                      />
                    }
                    label='Remember Me'
                  />
                </Grid>
                <Grid item>
                  <Typography>Need help signing in?</Typography>
                </Grid>
              </>
            ) : null}

            <Divider style={styles.divider} flexItem />

            <Grid item style={styles.center}>
              {login ? (
                <Typography>
                  Don't have an account?{' '}
                  <Button onClick={handleSignup} color='primary'>
                    Signup
                  </Button>
                </Typography>
              ) : (
                <Typography>
                  Have an account?{' '}
                  <Button onClick={handleSignup} color='primary'>
                    Login
                  </Button>
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

const styles = {
  dialog: {
    padding: 60,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
  },
  center: {
    textAlign: 'center',
  },
};
