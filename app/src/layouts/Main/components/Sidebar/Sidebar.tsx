import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppsRounded } from '@material-ui/icons';

import UserContext from '../../../../context/UserContext';

import { Profile, SidebarNav } from './components';
import routes from '../../../../constants/routes';
import roles from '../../../../constants/roles';

const useStyles = makeStyles((theme: any) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props: any) => {
  const { open, variant, onClose, className, ...rest } = props;

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;

  const classes = useStyles();

  const exclusivePages = user.activeRoles.includes(roles.ADMIN)
    ? [
        {
          title: 'Dashboard',
          href: routes.DASHBOARD,
          icon: <DashboardIcon />,
        },
        {
          title: 'Manage App',
          href: routes.MANAGE_APP,
          icon: <SettingsApplicationsIcon />,
        },
      ]
    : [];

  const pages = [
    ...exclusivePages,
    {
      title: 'History',
      href: routes.HISTORY,
      icon: <HistoryIcon />,
    },
    {
      title: 'Users',
      href: routes.USERS,
      icon: <PeopleIcon />,
    },
    {
      title: 'Apps',
      href: routes.APPS,
      icon: <AppsRounded />,
    },
    {
      title: 'Account',
      href: routes.ACCOUNT,
      icon: <AccountBoxIcon />,
    },
    {
      title: 'Settings',
      href: routes.USER_SETTINGS,
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile user={user} />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
