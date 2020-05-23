import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import UserContext from '../../../../context/UserContext';
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
import { logout } from '../../../../services/auth';
import routes from '../../../../constants/routes';
import {
  interpolate,
  extractFullName,
  extractInitials,
} from '../../../../utils/string';

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

const Account = () => {
  const user: any = useContext(UserContext);

  const { username, activeApp: appName } = user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes: any = useStyles();
  const history = useHistory();

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    history.push(routes.HOME);
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
          {extractInitials(user, false)}
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
