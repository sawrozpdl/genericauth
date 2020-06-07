import React, { useContext, useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, CardContent } from '@material-ui/core';
import UserContext from '../../context/UserContext';

import { AccountProfile, AccountDetails, LocationDetails } from './components';
import { fetchUserForApp, disableUser } from '../../services/user';
import Loading from '../../components/Loading';
import roles from '../../constants/roles';
import { handleError } from '../../utils/error';
import routes from '../../constants/routes';

import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import toast from '../../utils/toast';
import RoleDetails from './components/RoleDetails';
import alert from '../../utils/alert';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
  cardRoot: { marginTop: theme.spacing(3) },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2) + 'px !important',
  },
}));

const Account = (props: any) => {
  const userCtx: any = useContext(UserContext);
  const { user: activeUser } = userCtx;
  const classes = useStyles();

  const { history } = props;
  const { username } = props.match.params;

  const appName = activeUser.activeApp;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  const fetchAndSetUser = useCallback(async () => {
    try {
      const userData = await fetchUserForApp(username, appName);
      setUser(() => ({ ...userData }));
      setCanEdit(
        userData.email === activeUser.email ||
          activeUser.activeRoles.includes(roles.ADMIN)
      );
    } catch (error) {
      handleError(error);
      history.goBack();
    } finally {
      setLoading(false);
      if (user && !user.email) history.push(routes.NOT_FOUND);
    }
    //eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  const handleDisable = async (
    actionName: string,
    hard = false
  ): Promise<void> => {
    if (user.email === activeUser.email) {
      return toast.info(`${actionName} of self is not allowed!`);
    }
    const toDisable = user;
    try {
      await disableUser(toDisable, hard);
      toast.success(`${actionName} successful!`);
      if (hard) {
        history.push(routes.USERS);
      } else {
        fetchAndSetUser();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const isAdmin = activeUser.activeRoles.includes(roles.ADMIN);

  const handleDeactivateClick = async () => {
    if (!isAdmin) return;
    const action = user.activeInApp ? 'Deactivation' : 'Activation';
    alert(
      `Confirm ${action}`,
      `Are you sure you want to ${
        user.activeInApp ? 'deactivate' : 'activate'
      } this account?`,
      async () => {
        await handleDisable(action);
      }
    );
  };

  const handleDeleteClick = async () => {
    if (!isAdmin) return;
    const action = 'Deletion';
    alert(
      `Confirm ${action}`,
      `Are you sure you want to delete this account?`,
      async () => {
        await handleDisable(action, true);
      }
    );
  };

  const onComponentUpdate = async () => {
    fetchAndSetUser();
  };

  return (
    <div className={classes.root}>
      {!loading && user ? (
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile
              user={user}
              activeUser={activeUser}
              canEdit={canEdit}
              onUpdate={onComponentUpdate}
            />
            {isAdmin && (
              <Card className={classes.cardRoot}>
                <CardContent className={classes.cardAction}>
                  <Button
                    color="default"
                    variant="outlined"
                    startIcon={<BlockIcon />}
                    onClick={handleDeactivateClick}
                  >
                    {user.activeInApp ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDeleteClick}
                    startIcon={<DeleteIcon />}
                  >
                    {'Delete'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              user={user}
              activeUser={activeUser}
              onUpdate={onComponentUpdate}
              canEdit={canEdit}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <RoleDetails
              user={user}
              activeUser={activeUser}
              onUpdate={onComponentUpdate}
              isAdmin={isAdmin}
            />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <LocationDetails
              user={user}
              activeUser={activeUser}
              onUpdate={onComponentUpdate}
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
