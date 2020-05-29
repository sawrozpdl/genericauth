/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import moment from 'moment';
import {
  extractFullName,
  extractInitials,
  interpolate,
} from '../../utils/string';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { StatusBullet } from '../../components';
import events, { statusColors } from '../../constants/events';
import { Link, capitalize } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import routes from '../../constants/routes';
import { DISPLAY_DATE_FORMAT } from '../../constants/schemas';
import { getObjectById } from '../../utils/object';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  status: {
    marginRight: theme.spacing(1),
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const getColumns = (appName: string, users: any, avatar = true) => [
  {
    Header: 'Producer',
    width: 250,
    Cell: (props: any) => {
      const classes: any = useStyles();
      const { producer } = props.original;
      const entities = producer.split('/');
      if (entities[0] === 'apps')
        return (
          <div className={classes.nameContainer}>
            {avatar && (
              <Avatar className={classes.avatar}>
                {appName.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="body1">{capitalize(appName)}</Typography>
          </div>
        );
      const user = producer && getObjectById(users, entities[1]);
      return !user ? (
        <div className={classes.nameContainer}>
          {avatar && (
            <Avatar className={classes.avatar}>
              <DeleteIcon />
            </Avatar>
          )}
          <Typography variant="body1">{'DELETED'}</Typography>
        </div>
      ) : (
        <div className={classes.nameContainer}>
          {avatar && (
            <Avatar className={classes.avatar} src={user.avatarUrl}>
              {extractInitials(user, false) ||
                user.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography variant="body1">
            <Link
              component={RouterLink}
              to={interpolate(routes.USER_ACCOUNT, {
                appName: user.activeApp,
                username: user.username,
              })}
              variant="h6"
            >
              {extractFullName(user, false) || capitalize(user.username)}
            </Link>{' '}
          </Typography>
        </div>
      );
    },
    className: 'text-bold',
  },
  {
    Header: 'Action',
    accessor: 'action',
    width: 120,
    Cell: (props: any) => <>{props.value}</>,
  },
  {
    Header: 'Consumer',
    width: 250,
    Cell: (props: any) => {
      const classes: any = useStyles();
      const { consumer } = props.original;
      const entities = consumer.split('/');
      if (entities[0] === 'apps')
        return (
          <div className={classes.nameContainer}>
            {avatar && (
              <Avatar className={classes.avatar}>
                {appName.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="body1">{capitalize(appName)}</Typography>
          </div>
        );
      const user = consumer && getObjectById(users, entities[1]);
      return !user ? (
        <div className={classes.nameContainer}>
          {avatar && (
            <Avatar className={classes.avatar}>
              <DeleteIcon />
            </Avatar>
          )}
          <Typography variant="body1">{'DELETED'}</Typography>
        </div>
      ) : (
        <div className={classes.nameContainer}>
          {avatar && (
            <Avatar className={classes.avatar} src={user.avatarUrl}>
              {extractInitials(user, false) ||
                user.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography variant="body1">
            <Link
              component={RouterLink}
              to={interpolate(routes.USER_ACCOUNT, {
                appName: user.activeApp,
                username: user.username,
              })}
              variant="h6"
            >
              {extractFullName(user, false) || capitalize(user.username)}
            </Link>{' '}
          </Typography>
        </div>
      );
    },
    className: 'text-bold',
  },
  {
    Header: 'Method',
    Cell: (props: any) => {
      const classes: any = useStyles();
      const method = events[props.original.action].split(':')[1];
      return (
        <div className={classes.nameContainer}>
          <StatusBullet
            className={classes.status}
            color={statusColors[method]}
            size="sm"
          />
          {method}
        </div>
      );
    },
  },
  {
    Header: 'Description',
    accessor: 'description',
    width: 250,
    Cell: (props: any) => <>{props.value || '-'}</>,
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
    width: 200,
    Cell: (props: any) => (
      <>{moment(props.value).format(DISPLAY_DATE_FORMAT)}</>
    ),
  },
];

export default getColumns;
