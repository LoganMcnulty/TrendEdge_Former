import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Logo, DialogForm } from 'components';
import auth from 'services/authService';

const drawerWidth = 240;

export function AppBarMenu({
  open,
  handleDrawerToggle,
  handleMobileMenuOpen,
  mobileMenuId,
  user,
}) {
  const classes = useStyles();

  const handleLogout = () => {
    auth.logout();
    window.location.href = '/';
  };
  
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.logo}>
            <Logo />
          </Grid>
          <Grid item>
            <Typography variant='h5' noWrap>
              Trend Edge
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {user ? (
            <Button onClick={handleLogout} variant='outlined' color='inherit'>
              Logout
            </Button>
          ) : (
            <DialogForm />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    width: 40,
    marginRight: 5,
  },
  sectionDesktop: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
}));
