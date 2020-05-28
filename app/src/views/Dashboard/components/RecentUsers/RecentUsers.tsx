import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

import {
  interpolate,
  extractInitials,
  extractFullName,
} from '../../../../utils/string';
import routes from '../../../../constants/routes';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  content: {
    padding: 0,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const RecentUsers = (props: any) => {
  const { className, history, app, ...rest } = props;

  const classes: any = useStyles();

  const { name: appName, users } = app;

  const showingUsers = users.slice(Math.max(users.length - 5, 0)).reverse();

  const handleUserClick = (user: any) => {
    const { username } = user;
    history.push(interpolate(routes.USER_ACCOUNT, { username, appName }));
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${users.length} in total`}
        title="Recent Users"
        action={
          <Button color="primary" size="small" variant="outlined">
            Refresh
          </Button>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {showingUsers.map((user: any, i: number) => (
            <ListItem divider={i < showingUsers.length - 1} key={user.id}>
              <Avatar src={user.avatarUrl} className={classes.avatar}>
                {extractInitials(user, false) || 'A'}
              </Avatar>
              <ListItemText
                primary={extractFullName(user) || user.username}
                secondary={`Registered ${moment(user.createdAt).fromNow()}`}
              />
              <IconButton edge="end" size="small">
                <KeyboardArrowRightOutlinedIcon
                  onClick={() => handleUserClick(user)}
                />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          onClick={() =>
            history.push(interpolate(routes.USERS, { appName: app.name }))
          }
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

RecentUsers.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
};

export default RecentUsers;
