import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

const genders = [
  { label: 'Private', value: 'PRIVATE' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props: any) => {
  const { className, user, ...rest } = props;

  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthDate,
  } = user;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthDate,
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="Basic information about oneself"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Middle name"
                margin="dense"
                name="middleName"
                onChange={handleChange}
                value={values.middleName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Gender"
                margin="dense"
                name="gender"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {genders.map((gender) => (
                  <option key={gender.label} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Birth Date"
                margin="dense"
                name="birthDate"
                type="date"
                onChange={handleChange}
                value={values.birthDate}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                disabled={true}
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Update Profile
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default AccountDetails;
