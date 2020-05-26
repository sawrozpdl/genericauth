import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import {
  extractFullName,
  extractInitials,
} from '../../../../../../utils/string';
import roles from '../../../../../../constants/roles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  roles: { marginTop: theme.spacing(1) },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props: any) => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} src={user.avatar}>
        {extractInitials(user, false) || 'A'}
      </Avatar>
      <Typography className={classes.name} variant="h4">
        {extractFullName(user, false) || user.username}
      </Typography>
      <Typography variant="body2" className={classes.roles}>
        {user.activeRoles.includes(roles.ADMIN) ? roles.ADMIN : roles.USER}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default Profile;
