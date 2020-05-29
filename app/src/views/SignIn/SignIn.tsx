import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  capitalize,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../constants/routes';
import { interpolate } from '../../utils/string';
import http from '../../utils/http';
import toast from '../../utils/toast';
import { LOGIN_URL } from '../../constants/endpoints';
import { persist } from '../../services/token';
import { Buffer } from 'buffer';
import UserContext from '../../context/UserContext';
import { fetchUser } from '../../services/user';
import { handleError } from '../../utils/error';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
  password: {
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
  forgotPassword: { float: 'right' },
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
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = (props: any) => {
  const { history } = props;

  const { appName } = props.match.params;

  const userCtx: any = useContext(UserContext);
  const { setUser } = userCtx;

  const classes: any = useStyles();

  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

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

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    const { email, password } = formState.values;
    const key = new Buffer(`${email}:${password}`).toString('base64');
    try {
      const { data } = await http.post(interpolate(LOGIN_URL, { appName }), {
        accessToken: false,
        headers: { Authorization: `Basic ${key}` },
      });
      persist(data.refreshToken, data.refreshToken);
      await fetchUser(setUser);
      history.push(routes.HOME);
      toast.success('Login successful, Welcome back!');
    } catch (exception) {
      handleError(exception);
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
            {`Log in to ${capitalize(appName)}`}
          </Typography>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={handleSignIn}
          >
            <Typography
              align="center"
              className={classes.sugestion}
              color="textSecondary"
              variant="body1"
            ></Typography>
            <TextField
              className={classes.textField}
              error={hasError('email')}
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              label="Email Address or Username"
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
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={submitting || !formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign in now
            </Button>
            <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to={interpolate(routes.REGISTER, { appName })}
                variant="h6"
              >
                Sign up
              </Link>
              <Link
                component={RouterLink}
                className={classes.forgotPassword}
                to={interpolate(routes.FORGOT_PASSWORD, { appName })}
                variant="h6"
              >
                Forgot Password
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
