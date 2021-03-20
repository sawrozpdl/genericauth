import React, { useState } from 'react';
import moment from 'moment';
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
import { updateUser } from '../../../../services/user';
import toast from '../../../../utils/toast';
import { handleError } from '../../../../utils/error';
import { nullEmptyKeys } from '../../../../utils/object';

const genders = [
  { label: 'Private', value: 'PRIVATE' },
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const useStyles = makeStyles((theme: any) => ({
  root: {},
  cardAction: {
    padding: theme.spacing(2),
  },
}));

const AccountDetails = (props: any) => {
  const { className, user, canEdit, ...rest } = props;

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

  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthDate: birthDate && moment(birthDate).format('YYYY-MM-DD'),
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
    const newUser = nullEmptyKeys({ ...user, ...values });
    try {
      await updateUser(newUser);
      toast.success('Profile updated successfully');
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
                disabled={!canEdit}
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
                disabled={!canEdit}
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
                disabled={!canEdit}
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
                disabled={!canEdit}
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
                disabled={!canEdit}
                onChange={handleChange}
                defaultValue={values.birthDate}
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
                disabled={!canEdit}
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        {canEdit && (
          <>
            {' '}
            <Divider />
            <CardActions className={classes.cardAction}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                disabled={submitting}
              >
                Update Profile
              </Button>
            </CardActions>
          </>
        )}
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onUpdate: PropTypes.func,
  canEdit: PropTypes.bool,
  activeUser: PropTypes.object,
};

export default AccountDetails;
