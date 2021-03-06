import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  Divider,
  IconButton,
  Button,
  Box,
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SvgIcon } from '@material-ui/core';
import Logo from '../../../../components/Logo';
import THEMES from '../../../../constants/themes';
import { GITHUB_URL } from '../../../../constants/endpoints';

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
  toolbar: {
    minHeight: 64,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const Topbar = (props: any): any => {
  const { className, onMobileNavOpen, ...rest } = props;
  const classes: any = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onMobileNavOpen}
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
        </Hidden>
        <Box flexGrow={1} />
        <Link
          className={classes.link}
          component={RouterLink}
          color="inherit"
          to="/apps"
          underline="none"
          variant="body2"
        >
          <h4>Apps</h4>
        </Link>
        <Divider className={classes.divider} />
        <Button color="primary" variant="contained" size="small">
          <Link
            component="a"
            color="inherit"
            className={classes.link}
            href={GITHUB_URL}
            target="_blank"
            underline="none"
            variant="body2"
          >
            <h4>API</h4>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
