import React, { useState } from 'react';
import clsx from 'clsx';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
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
  const { className, ...rest } = props;

  const classes: any = useStyles();

  const [users] = useState(mockData);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader subtitle={`${users.length} in total`} title="Recent Users" />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {users.map((user, i) => (
            <ListItem divider={i < users.length - 1} key={user.id}>
              <Avatar src={user.avatarUrl} className={classes.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={user.name}
                secondary={`Registered ${user.updatedAt.fromNow()}`}
              />
              <IconButton edge="end" size="small">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

RecentUsers.propTypes = {
  className: PropTypes.string,
};

export default RecentUsers;
