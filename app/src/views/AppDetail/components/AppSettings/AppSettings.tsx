import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';

import toast from '../../../../utils/toast';
import { updateAppRedirectUrl } from '../../../../services/app';
import { handleError } from '../../../../utils/error';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  cardAction: {
    padding: theme.spacing(2),
  },
}));

const AppSettings = (props: any) => {
  const { className, app, canEdit, ...rest } = props;

  const { baseUrl, authCallbackUrl, profileUrl } = app.redirectUrl;

  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    baseUrl,
    authCallbackUrl,
    profileUrl,
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await updateAppRedirectUrl(app.name, { ...app.redirectUrl, ...values });
      toast.success('App URLs successfully');
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardHeader
          subheader={
            app.private
              ? 'Only public apps can have these URLs set'
              : 'URLs used for auth callbacks and redirection.'
          }
          title="App URLs"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Base URL"
                margin="dense"
                name="baseUrl"
                disabled={app.private}
                onChange={handleChange}
                value={values.baseUrl}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Auth Callback URL"
                margin="dense"
                name="authCallbackUrl"
                disabled={app.private}
                onChange={handleChange}
                value={values.authCallbackUrl}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Profile URL"
                margin="dense"
                name="profileUrl"
                disabled={app.private}
                onChange={handleChange}
                value={values.profileUrl}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.cardAction}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            disabled={submitting || app.private}
          >
            Update URLs
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AppSettings.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default AppSettings;
