import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  capitalize,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import http from '../../utils/http';
import { interpolate } from '../../utils/string';
import routes from '../../constants/routes';
import toast from '../../utils/toast';
import { USERS_URL } from '../../constants/endpoints';
import { handleError } from '../../utils/error';

const schema = {
  firstName: {
    presence: { allowEmpty: true },
    length: {
      maximum: 32,
    },
  },
  middleName: {
    presence: { allowEmpty: true },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: true },
    length: {
      maximum: 32,
    },
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
      pattern: /^[a-z0-9_-]{3,16}$/,
      message: 'Username is not valid',
    },
    length: {
      minimum: 3,
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
  rPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(5),
    marginLeft: theme.spacing(-2),
    marginBottom: theme.spacing(-3),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  policyCheckbox: {
    marginLeft: '-14px',
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignUp = (props: any) => {
  const { history } = props;

  const appName = props.match.params.appName;

  const classes: any = useStyles();

  interface FormState {
    isValid: boolean;
    values: any;
    touched: any;
    errors: any;
  }

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event: any) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    const {
      email,
      username,
      firstName,
      lastName,
      middleName,
      password,
      rPassword,
    } = formState.values;
    if (password !== rPassword) {
      setSubmitting(false);
      return toast.error("Passwords don't match, Please try again");
    }
    try {
      await http.post(interpolate(USERS_URL, { appName }), {
        body: {
          email,
          username,
          firstName,
          lastName,
          middleName,
          password,
        },
      });
      toast.success('Registration successful, You may now log in!');
      history.push(interpolate(routes.LOGIN, { appName }));
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const hasError = (field: any) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            {`Register for ${capitalize(appName)}`}
          </Typography>
          <form className={classes.form} onSubmit={handleSignUp}>
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
              error={hasError('middleName')}
              fullWidth
              helperText={
                hasError('middleName') ? formState.errors.middleName[0] : null
              }
              label="Middle name"
              name="middleName"
              onChange={handleChange}
              type="text"
              value={formState.values.middleName || ''}
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
              label="Confirm password"
              name="rPassword"
              onChange={handleChange}
              type="password"
              value={formState.values.rPassword || ''}
              variant="outlined"
            />
            <div className={classes.policy}>
              <Checkbox
                checked={formState.values.policy || false}
                className={classes.policyCheckbox}
                color="primary"
                name="policy"
                onChange={handleChange}
              />
              <Typography
                className={classes.policyText}
                color="textSecondary"
                variant="body1"
              >
                Make my profile public{' '}
                <Link
                  color="primary"
                  component={RouterLink}
                  to="#"
                  underline="always"
                  variant="h6"
                >
                  Learn More
                </Link>
              </Typography>
            </div>
            {hasError('policy') && (
              <FormHelperText error>
                {formState.errors.policy[0]}
              </FormHelperText>
            )}
            <Button
              className={classes.signUpButton}
              color="primary"
              disabled={submitting || !formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up now
            </Button>
            <Typography color="textSecondary" variant="body1">
              Have an account?{' '}
              <Link component={RouterLink} to="/sign-in" variant="h6">
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </Container>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
