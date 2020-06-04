import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  capitalize,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, SvgIcon } from '@material-ui/core';
import Logo from '../../../../components/Logo';
import UserContext from '../../../../context/UserContext';
import Account from './Account';
import Settings from './Settings';
import THEMES from '../../../../constants/themes';

const useStyles = makeStyles((theme: any) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.main,
        }
      : {}),
    ...(theme.name === THEMES.DARK
      ? {
          backgroundColor: theme.palette.background.default,
        }
      : {}),
  },
  logoName: { marginLeft: theme.spacing(1) },
  toolbar: {
    minHeight: 64,
  },
}));

const Topbar = (props: any): any => {
  const { className, onSidebarOpen, ...rest } = props;
  const userCtx: any = useContext(UserContext);
  const { user, logout } = userCtx;

  const { activeApp: appName } = user;

  const classes: any = useStyles();
  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onSidebarOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Typography variant="h3" className={classes.logoName}>
            {appName && capitalize(appName)}
          </Typography>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <Settings />
        <Box ml={2}>
          <Account user={user} onLogout={logout} appName={appName} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
