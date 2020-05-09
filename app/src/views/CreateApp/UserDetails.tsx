import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const UserDetails = (props: any) => {
  const { onNext, formState, handleChange, hasError, isSubmitting } = props;
  const classes: any = useStyles();

  return (
    <div>
      <Typography variant="h3" color="textPrimary">
        Create an account
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          This account will be the admin for the created app
        </Typography>
      </Box>
      <Box mt={2}>
        <TextField
          className={classes.textField}
          error={hasError('firstName')}
          fullWidth
          helperText={
            hasError('firstName') ? formState.errors.firstName[0] : null
          }
          label="First name"
          name="firstName"
          onChange={handleChange}
          type="text"
          value={formState.values.firstName || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('lastName')}
          fullWidth
          helperText={
            hasError('lastName') ? formState.errors.lastName[0] : null
          }
          label="Last name"
          name="lastName"
          onChange={handleChange}
          type="text"
          value={formState.values.lastName || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={handleChange}
          type="text"
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </Box>
      <Box mt={6} display="flex">
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          type="submit"
          onClick={onNext}
          variant="contained"
          size="large"
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  formState: PropTypes.any,
  handleChange: PropTypes.func,
  hasError: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default UserDetails;
