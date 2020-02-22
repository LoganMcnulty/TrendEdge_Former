import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { DrawerMenu } from 'components';

import Theme from 'themes';

function Template({ children }) {
  const classes = useStyles();
  return (
    <Theme>
      <DrawerMenu>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <Grid
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={4}
              xs={12}
            >
              {children}
            </Grid>
          </Container>
        </main>
      </DrawerMenu>
    </Theme>
  );
}

export default Template;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5, 0),
  },
}));
