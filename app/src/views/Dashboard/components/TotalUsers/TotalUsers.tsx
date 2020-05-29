import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

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
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  userIcon: {
    color: theme.palette.success.dark,
  },
  activeUsers: {
    color: theme.palette.success.dark,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
}));

const TotalUsers = (props: any) => {
  const { className, app, ...rest } = props;

  const { registrations } = app;

  const activeUsers = registrations.reduce(
    (acc: any, curr: any) => (curr.active ? acc + 1 : acc),
    0
  );

  const classes: any = useStyles();

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
              TOTAL USERS
            </Typography>
            <Typography variant="h3">{registrations.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <AccessibilityNewIcon className={classes.userIcon} />
          <Typography className={classes.activeUsers} variant="body2">
            {activeUsers}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Users active
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default TotalUsers;
