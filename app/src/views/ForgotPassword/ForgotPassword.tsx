import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import toast from '../../utils/toast';
import { CHANGE_PASSWORD_URL, VERIFY_URL } from '../../constants/endpoints';
import routes from '../../constants/routes';
import { handleError } from '../../utils/error';
import { parseQuery, interpolate } from '../../utils/string';
import http from '../../utils/http';
import { Buffer } from 'buffer';

const pSchema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 8,
    },
  },
  rpassword: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const eSchema = {
  email: {
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
  vLabel: { marginTop: theme.spacing(2) },
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
    paddingTop: theme.spacing(10),
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

  const classes: any = useStyles();

  const query = parseQuery(props.location.search);

  const [verified, setVerified] = useState(false);
  const [sending, setSending] = useState(false);

  if (query.token && !verified) {
    setVerified(true);
  }

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
    const errors = validate(formState.values, verified ? pSchema : eSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, verified]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (event: any) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handlePasswordChange = async () => {
    const { password, rpassword } = formState.values;

    if (password !== rpassword) {
      toast.warning('Passwords donot match, Please try again!');
      return;
    }

    await http.post(CHANGE_PASSWORD_URL, {
      accessToken: false,
      body: { password },
      headers: {
        Authorization: `Bearer ${query.token}`,
      },
    });
    toast.success('Password change Successful! You may now log in');
    history.push(interpolate(routes.LOGIN, { appName }));
  };

  const handleEmailVerification = async () => {
    const { email } = formState.values;
    await http.post(VERIFY_URL, {
      accessToken: false,
      params: {
        id: new Buffer(email).toString('base64'),
        actionName: 'Recover Password',
        actionDescription: 'to change your password',
        redirectTo: window.location.href.split('?')[0],
      },
    });
    toast.success(
      'Link sent! Please check your email and follow the instructions'
    );
    history.push(routes.HOME);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setSending(true);
    try {
      if (verified) return await handlePasswordChange();
      await handleEmailVerification();
      setFormState((formState: any) => {
        return { errors: {}, touched: {}, values: {}, isValid: false };
      });
    } catch (error) {
      handleError(error);
    } finally {
      setSending(false);
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
            {`${verified ? 'Change ' : 'Forgot '} Password`}
          </Typography>
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Typography
              align="center"
              className={classes.sugestion}
              color="textSecondary"
              variant="body1"
            ></Typography>
            {verified ? (
              <>
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="New Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('rpassword')}
                  fullWidth
                  helperText={
                    hasError('rpassword') ? formState.errors.rpassword[0] : null
                  }
                  label="Re type New Password"
                  name="rpassword"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.rpassword || ''}
                  variant="outlined"
                />
              </>
            ) : (
              <>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  className={classes.vLabel}
                >
                  {'We will send you a verification link to this email'}
                </Typography>
              </>
            )}
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={sending || !formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {verified ? 'Change Password' : 'Proceed Verification'}
            </Button>
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
