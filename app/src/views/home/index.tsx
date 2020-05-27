import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import toast from '../../utils/toast';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Buffer } from 'buffer';
import { Button, TextField, Link } from '@material-ui/core';
import routes from '../../constants/routes';
import http from '../../utils/http';
import { APP_CREATE_URL, VERIFY_URL } from '../../constants/endpoints';
import { handleError } from '../../utils/error';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const Home: React.FC = (props: any) => {
  const { className, history, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      paddingTop: 200,
      minHeight: '100vh',
      paddingBottom: 200,
      [theme.breakpoints.down('md')]: {
        paddingTop: 60,
        paddingBottom: 60,
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '70%',
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    signUpButton: {
      margin: theme.spacing(2, 0),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
    typoSend: {
      marginTop: theme.spacing(1),
    },
    image: {
      perspectiveOrigin: 'left center',
      transformStyle: 'preserve-3d',
      perspective: 1500,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
        transform: 'rotateY(-35deg) rotateX(15deg)',
        backfaceVisibility: 'hidden',
        boxShadow: theme.shadows[16],
      },
    },
    shape: {
      position: 'absolute',
      top: 0,
      left: 0,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
      },
    },
  }));

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

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState: FormState) => ({
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
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleAppCreate = async (event: any) => {
    event.preventDefault();
    setSending(true);
    try {
      const email = formState.values.email;
      await http.post(VERIFY_URL, {
        accessToken: false,
        params: {
          id: new Buffer(email).toString('base64'),
          actionName: 'Create App',
          redirectTo: APP_CREATE_URL,
        },
      });
      setFormState((formState: any) => {
        return { errors: {}, touched: {}, values: {}, isValid: false };
      });
      toast.success(
        'Link sent! Please check your email and follow the instructions'
      );
    } catch (error) {
      handleError(error);
    } finally {
      setSending(false);
    }
  };

  const hasError = (field: any) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const classes: any = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="overline" color="secondary">
                generics presents
              </Typography>
              <Typography variant="h1" color="textPrimary">
                Hamro Auth - A generic authentication module
              </Typography>
              <Box mt={3}>
                <Typography variant="body1" color="textSecondary">
                  A generic authentication service which provides API interfaces
                  which can be intergrated easily to almost every application
                  &amp; is easy to use &amp; also provides generic login/signup
                  forms, generic mail system &amp; the list goes on
                </Typography>
              </Box>
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      100+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Apps Using
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      JWT
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Authentication
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      10k+
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Users
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                  Create your own app here
                </Typography>
                <Typography
                  component="h3"
                  color="textSecondary"
                  variant="body1"
                  className={classes.typoSend}
                >
                  We will send you &apos;IAM&apos; link to the email and you are
                  almost there!
                </Typography>
                <form
                  autoComplete="off"
                  className={classes.form}
                  onSubmit={handleAppCreate}
                >
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    disabled={!formState.isValid || sending}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create App
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    Already Have an app? Sign in{' '}
                    <Link component={RouterLink} to={routes.APPS} variant="h6">
                      Here
                    </Link>
                  </Typography>
                </form>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
