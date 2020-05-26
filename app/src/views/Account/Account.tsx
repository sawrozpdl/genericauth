import React, { useContext, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserContext from '../../context/UserContext';

import { AccountProfile, AccountDetails, LocationDetails } from './components';
import { fetchUserForApp } from '../../services/user';
import Loading from '../../components/Loading';
import roles from '../../constants/roles';
import { handleError } from '../../utils/error';
import routes from '../../constants/routes';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
}));

const Account = (props: any) => {
  const userCtx: any = useContext(UserContext);
  const { user: activeUser } = userCtx;
  const classes = useStyles();

  const { history } = props;
  const { username, appName } = props.match.params;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  const fetchAndSetUser = useCallback(async () => {
    try {
      const userData = await fetchUserForApp(username, appName);
      setUser(userData);
      setCanEdit(
        userData.email === activeUser.email ||
          activeUser.activeRoles.includes(roles.ADMIN)
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      if (user && !user.email) history.push(routes.NOT_FOUND);
    }
    //eslint-disable-next-line
  }, [username, appName]);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  return (
    <div className={classes.root}>
      {!loading && user ? (
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile
              user={user}
              activeUser={activeUser}
              canEdit={canEdit}
            />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              user={user}
              activeUser={activeUser}
              canEdit={canEdit}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <div />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <LocationDetails
              location={user.location}
              activeUser={activeUser}
              canEdit={canEdit}
            />
          </Grid>
        </Grid>
      ) : (
        <Loading height={500} />
      )}
    </div>
  );
};

export default Account;
