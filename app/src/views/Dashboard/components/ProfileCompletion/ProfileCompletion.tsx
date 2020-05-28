import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
} from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { getProfileCompleteness } from '../../../../utils/string';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  progress: {
    marginTop: theme.spacing(3),
  },
}));

const ProfileCompletion = (props: any) => {
  const { className, app, ...rest } = props;

  const { users } = app;

  const completion = users.reduce(
    (acc: any, curr: any) => acc + getProfileCompleteness(curr),
    0
  );

  const percent = (completion / users.length).toFixed(2);

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              PROFILE COMPLETION
            </Typography>
            <Typography variant="h3">{percent}%</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AssignmentTurnedInIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={+percent}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

ProfileCompletion.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default ProfileCompletion;
