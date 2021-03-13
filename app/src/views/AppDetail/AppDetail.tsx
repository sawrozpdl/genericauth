import React, { useContext, useEffect, useState, useCallback } from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
} from '@material-ui/core';
import UserContext from '../../context/UserContext';

import toast from '../../utils/toast';
import alert from '../../utils/alert';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import { fetchApp } from '../../services/app';
import Loading from '../../components/Loading';
import { handleError } from '../../utils/error';
import { disableUser } from '../../services/user';
import { AppInfo, AppSettings, LocationDetails } from './components';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
  cardRoot: { marginTop: theme.spacing(3) },
  typography: { marginTop: theme.spacing(0.5) },
  codeMarg: { marginTop: theme.spacing(2) },
  code: {
    padding: '4px',
    margin: 0,
    borderRadius: '4px',
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    border: '1px solid ' + theme.palette.primary.main,
  },
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

  const appName = activeUser.activeApp;

  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetApp = useCallback(async () => {
    try {
      const app = await fetchApp(appName);
      setApp(app);
    } catch (error) {
      handleError(error);
      history.goBack();
    } finally {
      setLoading(false);
      if (app && !app.id) history.push(routes.NOT_FOUND);
    }
    //eslint-disable-next-line
  }, [appName]);

  useEffect(() => {
    fetchAndSetApp();
  }, [fetchAndSetApp]);

  const handleDisable = async (
    actionName: string,
    hard = false
  ): Promise<void> => {
    if (app.email === activeUser.email) {
      return toast.info(`${actionName} of self is not allowed!`);
    }
    const toDisable = app;
    try {
      await disableUser(toDisable, hard);
      toast.success(`${actionName} successful!`);
      if (hard) {
        history.push(routes.USERS);
      } else {
        fetchAndSetApp();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const isAdmin = activeUser.activeRoles.includes(roles.ADMIN);

  const handleDeactivateClick = async () => {
    if (!isAdmin) return;
    const action = app.activeInApp ? 'Deactivation' : 'Activation';
    alert(
      `Confirm ${action}`,
      `Are you sure you want to ${
        app.activeInApp ? 'deactivate' : 'activate'
      } this app?`,
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
      `Are you sure you want to delete this app?`,
      async () => {
        await handleDisable(action, true);
      }
    );
  };

  const onComponentUpdate = async () => {
    fetchAndSetApp();
  };

  return (
    <div className={classes.root}>
      {!loading && app ? (
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AppInfo app={app} onUpdate={onComponentUpdate} />
            <Card className={classes.cardRoot}>
              <CardHeader
                subheader="Used for app-wide token signing and verification"
                title="Credentials"
              />
              <Divider />
              <CardContent>
                <Typography
                  className={classes.typography}
                  color="textSecondary"
                  variant="body1"
                >
                  {'Client ID: '}
                  <code className={classes.code}>
                    {app.credential.clientId}
                  </code>
                </Typography>
                <Typography
                  className={classes.typography + ` ${classes.codeMarg}`}
                  color="textSecondary"
                  variant="body1"
                >
                  {'Client Secret: '}
                  <code className={classes.code}>
                    {app.credential.clientSecret}
                  </code>
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardRoot}>
              <CardContent className={classes.cardAction}>
                <Button
                  color="default"
                  variant="outlined"
                  disabled={true}
                  startIcon={<BlockIcon />}
                  onClick={handleDeactivateClick}
                >
                  {app.active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={true}
                  onClick={handleDeleteClick}
                  startIcon={<DeleteIcon />}
                >
                  {'Delete'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Grid item lg={12} md={8} xl={12} xs={12}>
              <AppSettings app={app} onUpdate={onComponentUpdate} />
            </Grid>
            <Grid
              item
              lg={12}
              md={8}
              xl={12}
              xs={12}
              className={classes.cardRoot}
            >
              <LocationDetails app={app} onUpdate={onComponentUpdate} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Loading height={500} />
      )}
    </div>
  );
};

export default Account;
