import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const Registrations = (props: any) => {
  const { className, app, ...rest } = props;

  const classes: any = useStyles();

  const { registrations } = app;

  const thisMonth = new Date();
  const prevMonth = new Date();
  prevMonth.setMonth(thisMonth.getMonth() - 1);

  const filtered = registrations.reduce(
    (acc: any, curr: any) => {
      const date: Date = new Date(curr.registeredAt);
      if (date >= prevMonth) acc['thisMonth']++;
      else acc['prevMonth']++;
      return acc;
    },
    {
      thisMonth: 0,
      prevMonth: 0,
    }
  );

  const increase = Math.ceil(
    (filtered['thisMonth'] * 100) / (filtered['prevMonth'] || 1)
  );

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
              REGISTRATIONS THIS MONTH
            </Typography>
            <Typography variant="h3">{filtered['thisMonth']}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            {increase}%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Registrations.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default Registrations;
