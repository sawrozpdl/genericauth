import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Avatar,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { PublicRounded, LockRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: any) => ({
  root: {
    cursor: 'pointer',
    border: `2px solid rgba(0,0,0,0)`,
    transition: '0.2s ease',
    '&:hover': {
      border: `2px solid ${theme.palette.divider}`,
      transition: '0.2s ease',
    },
  },
  imageContainer: {
    height: 50,
    width: 50,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const AppCard = (props: any) => {
  const { className, app, history, ...rest } = props;

  const classes: any = useStyles();

  const handleAppClick = (event: any) => {
    history.push('/sign-in');
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      onClick={!app.isPrivate && handleAppClick}
    >
      <CardContent>
        <Avatar className={classes.imageContainer} src={app.logoUrl}>
          {app.name.charAt(0)}
        </Avatar>
        <Typography align="center" gutterBottom variant="h4">
          {app.title}
        </Typography>
        <Typography align="center" variant="body1">
          {app.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Created: {app.createdAt}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            {app.isPrivate ? (
              <LockRounded className={classes.statsIcon} />
            ) : (
              <PublicRounded className={classes.statsIcon} />
            )}
            <Typography display="inline" variant="body2">
              {app.totalUsers} Users
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

AppCard.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object.isRequired,
};

export default AppCard;
