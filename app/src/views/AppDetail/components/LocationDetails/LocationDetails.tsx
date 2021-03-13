import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
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
import { handleError } from '../../../../utils/error';
import { countries } from '../../../../constants/location';
import { updateAppLocation } from '../../../../services/app';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  cardAction: {
    padding: theme.spacing(2),
  },
}));

const LocationDetails = (props: any) => {
  const { className, app, ...rest } = props;
  let { location } = app;

  if (!location) location = {};

  const { streetAddress, postalCode, city, stateProvince, country } = location;

  const classes = useStyles();

  const [values, setValues] = useState({
    streetAddress,
    postalCode,
    city,
    stateProvince,
    country,
  });

  const [submitting, setSubmitting] = useState(false);
  const [states, setStates] = useState(['Select a country first']);

  useEffect(() => {
    const countryObj = countries.find(
      (countryObj) => countryObj.country === values.country
    );
    setStates(countryObj ? countryObj.states : ['Select a country first']);
  }, [values.country]);

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
      await updateAppLocation(app.name, { ...app?.location, ...values });
      toast.success('Location updated successfully');
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
          subheader="Location information about the application"
          title="Location"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="city"
                onChange={handleChange}
                value={values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Postal Code"
                margin="dense"
                name="postalCode"
                onChange={handleChange}
                value={values.postalCode}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                margin="dense"
                name="streetAddress"
                onChange={handleChange}
                value={values.streetAddress}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="stateProvince"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.stateProvince}
                variant="outlined"
              >
                {values.country && (
                  <option key={'none'} value={0}>
                    Select a state
                  </option>
                )}
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.country}
                variant="outlined"
              >
                <option key={'none'} value={0}>
                  Select a country
                </option>
                {countries.map((countryObj) => (
                  <option key={countryObj.country} value={countryObj.country}>
                    {countryObj.country}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.cardAction}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            disabled={submitting}
          >
            Update Location
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

LocationDetails.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default LocationDetails;
