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
    marginBottom: theme.spacing(2),
  },
}));

const UserDetails = (props: any) => {
  const { onNext, formState, handleChange, hasError, isSubmitting } = props;
  let { allowEmail, noCaptions } = props;
  const classes: any = useStyles();

  if (!allowEmail) allowEmail = false;
  if (!noCaptions) noCaptions = false;

  return (
    <div>
      {!noCaptions && (
        <>
          {' '}
          <Typography variant="h3" color="textPrimary">
            Create an account
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textSecondary">
              This account will be the admin for the created app
            </Typography>
          </Box>
        </>
      )}
      <Box mt={2}>
        <TextField
          className={classes.textField}
          error={hasError('username')}
          fullWidth
          helperText={
            hasError('username') ? formState.errors.username[0] : null
          }
          label="Username"
          name="username"
          onChange={handleChange}
          type="text"
          value={formState.values.username || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          disabled={!allowEmail}
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
        <TextField
          className={classes.textField}
          error={hasError('rPassword')}
          fullWidth
          helperText={
            hasError('rPassword') ? formState.errors.rPassword[0] : null
          }
          label="Confirm Password"
          name="rPassword"
          onChange={handleChange}
          type="password"
          value={formState.values.rPassword || ''}
          variant="outlined"
        />
      </Box>
      {onNext && (
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
      )}
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
  allowEmail: PropTypes.bool,
  noCaptions: PropTypes.bool,
};

export default UserDetails;
