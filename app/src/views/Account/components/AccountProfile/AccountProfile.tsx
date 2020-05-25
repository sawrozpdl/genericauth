import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';
import {
  extractFullName,
  getProfileCompleteness,
  extractInitials,
} from '../../../../utils/string';
import { DISPLAY_DATE_FORMAT } from '../../../../constants/schemas';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 110,
    fontSize: theme.spacing(4),
    flexShrink: 0,
    flexGrow: 0,
  },
  typography: { marginTop: theme.spacing(0.5) },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountProfile = (props: any) => {
  const { className, user, ...rest } = props;

  const classes: any = useStyles();

  const profleCompleteness = Math.floor(getProfileCompleteness(user));

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {extractFullName(user) || 'Mr. Anon'}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Roles: ' + user.activeRoles.map((role: any) => ` ${role}`)}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Joined: '}
              {moment(user.createdAt).format(DISPLAY_DATE_FORMAT)}
            </Typography>
            <Typography
              className={classes.typography}
              color="textSecondary"
              variant="body1"
            >
              {'Time: '}
              {moment().format('hh:mm A')}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={user.avatarUrl}>
            {extractInitials(user) || 'A'}
          </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">{`Profile Completeness: ${profleCompleteness}%`}</Typography>
          <LinearProgress
            value={profleCompleteness || 5}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default AccountProfile;
