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
  cardAction: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
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
  const { className, user, canEdit, ...rest } = props;

  const classes: any = useStyles();

  const profleCompleteness = Math.floor(getProfileCompleteness(user));

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {extractFullName(user) || user.username}
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
      {canEdit && (
        <>
          {' '}
          <Divider />
          <CardActions className={classes.cardAction}>
            <Button
              className={classes.uploadButton}
              color="primary"
              variant="outlined"
            >
              Upload picture
            </Button>
            <Button variant="outlined">Remove picture</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  canEdit: PropTypes.bool,
  onUpdate: PropTypes.func,
  activeUser: PropTypes.object,
};

export default AccountProfile;
