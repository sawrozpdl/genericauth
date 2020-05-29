import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  Radio,
  Button,
  makeStyles,
  TextField,
} from '@material-ui/core';

const typeOptions = [
  {
    value: 1,
    title: 'Private',
    description: 'Admins can only create users',
  },
  {
    value: -1,
    title: 'Public',
    description: 'Anyone can signup for an account',
  },
  {
    value: 0,
    title: 'Invite',
    description: 'Users can signup upon an invitation from admins',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const AppDetails = (props: any) => {
  const {
    onBack,
    onComplete,
    formState,
    handleChange,
    hasError,
    isSubmitting,
  } = props;
  const classes: any = useStyles();

  const paperStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    p: 2,
    mb: 2,
  };
  return (
    <div>
      <Typography variant="h4" color="textPrimary" className={classes.heading}>
        Choose a App Name and Privacy Setting
      </Typography>
      <TextField
        className={classes.textField}
        error={hasError('appName')}
        fullWidth
        helperText={hasError('appName') ? formState.errors.appName[0] : null}
        label="App Name"
        name="appName"
        onChange={handleChange}
        type="text"
        value={formState.values.appName || ''}
        variant="outlined"
      />
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          Apps will behave on the way these scopes
        </Typography>
      </Box>
      <Box mt={2}>
        {typeOptions.map((typeOption) => (
          <Paper
            {...paperStyles}
            component={Box}
            elevation={
              formState.values.appPrivacy === typeOption.value ? 10 : 1
            }
            key={typeOption.value}
          >
            <Radio
              checked={formState.values.appPrivacy === typeOption.value}
              onClick={() =>
                handleChange({
                  target: { name: 'appPrivacy', value: typeOption.value },
                })
              }
            />
            <Box ml={2}>
              <Typography gutterBottom variant="h5" color="textPrimary">
                {typeOption.title}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {typeOption.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box mt={6} display="flex">
        {onBack && (
          <Button onClick={onBack} size="large" disabled={!onBack}>
            Previous
          </Button>
        )}
        <Box flexGrow={1} />
        <Button
          color="secondary"
          disabled={isSubmitting}
          onClick={onComplete}
          variant="contained"
          size="large"
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

AppDetails.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.any,
  formState: PropTypes.any,
  handleChange: PropTypes.func,
  hasError: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default AppDetails;
