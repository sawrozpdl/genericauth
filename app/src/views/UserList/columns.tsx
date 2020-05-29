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
import { Link } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import routes from '../../constants/routes';
import { DISPLAY_DATE_FORMAT } from '../../constants/schemas';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
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

const columns = [
  {
    Header: 'Name',
    width: 250,
    Cell: (props: any) => {
      const classes: any = useStyles();
      const { activeApp: appName } = props.original;
      return (
        <div className={classes.nameContainer}>
          <Avatar className={classes.avatar} src={props.original.avatarUrl}>
            {extractInitials(props.original, false) || 'A'}
          </Avatar>
          <Typography variant="body1">
            <Link
              component={RouterLink}
              to={interpolate(routes.USER_ACCOUNT, {
                appName,
                username: props.original.username,
              })}
              variant="h6"
            >
              {extractFullName(props.original, false) ||
                props.original.username}
            </Link>{' '}
          </Typography>
        </div>
      );
    },
    className: 'text-bold',
  },
  {
    Header: 'Email',
    accessor: 'email',
    width: 120,
    Cell: (props: any) => <>{props.value || '-'}</>,
  },
  {
    Header: 'Username',
    accessor: 'username',
    width: 150,
    Cell: (props: any) => <>{props.value || '-'}</>,
  },
  {
    Header: 'Phone',
    accessor: 'phoneNumber',
    width: 250,
    Cell: (props: any) => <>{props.value || '-'}</>,
  },
  {
    Header: 'Registration Date',
    accessor: 'createdAt',
    width: 200,
    Cell: (props: any) => (
      <>{moment(props.value).format(DISPLAY_DATE_FORMAT)}</>
    ),
  },
];

export default columns;
