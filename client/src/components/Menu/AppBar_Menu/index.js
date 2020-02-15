import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/More';
import { Logo, DialogForm } from 'components';

const drawerWidth = 240;

export function AppBarMenu({
  open,
  handleDrawerOpen,
  handleMobileMenuOpen,
  mobileMenuId,
  user,
}) {
  const classes = useStyles();
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
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
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
          {user.email ? (
            <DialogForm />
          ) : (
            <a href='/'>
              <h3 style={{ color: 'white' }}>Logout</h3>
            </a>
          )}
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#4682B4',
    //#ab3900 <-- complimentary red color or #ab001d
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  logo: {
    width: 40,
    marginRight: 5,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
}));
