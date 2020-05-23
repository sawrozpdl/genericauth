import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import UserContext from '../../context/UserContext';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();

  const user = useContext(UserContext);

  console.log('you are : ', user);
  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
