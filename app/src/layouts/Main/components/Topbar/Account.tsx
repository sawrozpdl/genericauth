import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import * as authService from '../../../../services/auth';
import routes from '../../../../constants/routes';
import {
  interpolate,
  extractFullName,
  extractInitials,
} from '../../../../utils/string';
import toast from '../../../../utils/toast';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1),
  },
  popover: {
    width: 200,
  },
}));

const Account = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const { user, onLogout } = props;

  const classes: any = useStyles();

  if (!user) return <div />;

  const { username, activeApp: appName } = user;

  const handleLogout = async () => {
    try {
      await authService.logout(appName);
      onLogout();
      history.push(routes.HOME);
      toast.success('Logout successfull!');
    } catch (error) {
      toast.error('Unknown error occured');
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
      >
        <Avatar alt="User" className={classes.avatar} src={user.avatarUrl}>
          {extractInitials(user, false) || 'A'}
        </Avatar>
        <Hidden smDown>
          <Typography variant="h6" color="inherit">
            {extractFullName(user, false)}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem
          component={RouterLink}
          to={interpolate(routes.USER_ACCOUNT, { appName, username })}
        >
          Account
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={interpolate(routes.USER_SETTINGS, { appName, username })}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
