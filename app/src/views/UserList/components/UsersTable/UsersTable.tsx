import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Link } from '@material-ui/core';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import {
  extractInitials,
  extractFullName,
  interpolate,
} from '../../../../utils/string';
import { DISPLAY_DATE_FORMAT } from '../../../../constants/schemas';
import routes from '../../../../constants/routes';

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

const UsersTable = (props: any) => {
  const { className, users, appName, ...rest } = props;

  const classes: any = useStyles();

  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const handleSelectAll = (event: any) => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map((user: any) => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event: any, id: any) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers: any = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Registration date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar className={classes.avatar} src={user.avatarUrl}>
                          {extractInitials(user, false) || 'A'}
                        </Avatar>
                        <Typography variant="body1">
                          <Link
                            component={RouterLink}
                            to={interpolate(routes.USER_ACCOUNT, {
                              appName,
                              username: user.username,
                            })}
                            variant="h6"
                          >
                            {extractFullName(user, false) || 'Anonymous'}
                          </Link>
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.phoneNumber || 'Private'}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format(DISPLAY_DATE_FORMAT)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>{props.children}</CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  appName: PropTypes.string,
  users: PropTypes.array.isRequired,
};

export default UsersTable;
