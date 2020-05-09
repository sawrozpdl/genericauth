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
  const account = {
    user: {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/images/avatars/avatar_6.png',
      bio: 'Sales Manager',
      canHire: false,
      country: 'USA',
      email: 'katarina.smith@devias.io',
      username: 'admin',
      password: 'admin',
      firstName: 'Katarina',
      isPublic: true,
      lastName: 'Smith',
      phone: '+40 777666555',
      role: 'admin',
      state: 'New York',
      timezone: '4:32PM (GMT-4)',
    },
  };
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
    history.push('/');
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={account.user.avatar}
        />
        <Hidden smDown>
          <Typography variant="h6" color="inherit">
            {`${account.user.firstName} ${account.user.lastName}`}
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
        <MenuItem component={RouterLink} to="/app/social/profile">
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/app/account">
          Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
