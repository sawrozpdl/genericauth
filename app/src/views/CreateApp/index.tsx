import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
  withStyles,
  colors,
} from '@material-ui/core';
import {
  NavigateNextRounded as NavigateNextIcon,
  SupervisedUserCircleRounded as UserIcon,
  StarRounded as StarIcon,
  AppsRounded as AppIcon,
} from '@material-ui/icons';
import UserDetails from './UserDetails';
import AppDetails from './AppDetails';

const steps = [
  {
    label: 'User Details',
    icon: UserIcon,
  },
  {
    label: 'App Details',
    icon: AppIcon,
  },
];

const userSchema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
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
      minimum: 8,
      maximum: 128,
    },
  },
};

const appSchema = {
  appName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
      minimum: 3,
    },
  },
  appPrivacy: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomStepIcon = (props: any) => {
  const { active, completed, icon } = props;
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
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
  avatar: {
    backgroundColor: colors.red[600],
  },
}));

const ProjectCreateView = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  interface FormState {
    isValid: boolean;
    values: any;
    touched: any;
    errors: any;
  }

  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {
      appPrivacy: 0,
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(
      formState.values,
      activeStep === 0 ? userSchema : appSchema
    );

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, activeStep]);

  const hasError = (field: any) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleChange = (event: any) => {
    if (event.persist) event.persist();
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

  const touchUserFields = () => {
    setFormState((formState) => ({
      ...formState,
      touched: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      },
    }));
  };

  const touchAppFields = () => {
    setFormState((formState) => ({
      ...formState,
      touched: {
        appName: true,
        appPrivacy: true,
      },
    }));
  };

  const handleNext = (event: any) => {
    event.preventDefault();
    touchUserFields();
    if (!formState.isValid) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = (event: any) => {
    event.preventDefault();
    touchAppFields();
    if (!formState.isValid) {
      // setFormState((formState) => ({
      //   ...formState,
      //   errors: {
      //     appName: 'App name is required',
      //   },
      //   touched: {
      //     appName: true,
      //   },
      // }));
      return;
    }
    //API
    setCompleted(true);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box mb={3}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link variant="body1" color="inherit" to="/" component={RouterLink}>
            Home
          </Link>
          <Typography variant="body1" color="textPrimary">
            Create App
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Create App &amp; Admin User
        </Typography>
      </Box>
      {!completed ? (
        <Paper>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Stepper
                activeStep={activeStep}
                connector={<CustomStepConnector />}
                orientation="vertical"
                component={Box}
              >
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel StepIconComponent={CustomStepIcon}>
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={12} md={9}>
              <form onSubmit={handleComplete} className={clsx(classes.form)}>
                <Box p={3}>
                  {activeStep === 0 && (
                    <UserDetails
                      onBack={handleBack}
                      onNext={handleNext}
                      formState={formState}
                      handleChange={handleChange}
                      hasError={hasError}
                      isSubmitting={completed}
                    />
                  )}
                  {activeStep === 1 && (
                    <AppDetails
                      onBack={handleBack}
                      onComplete={handleComplete}
                      formState={formState}
                      handleChange={handleChange}
                      hasError={hasError}
                      isSubmitting={completed}
                    />
                  )}
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Card>
          <CardContent>
            <Box maxWidth={450} mx="auto">
              <Box display="flex" justifyContent="center">
                <Avatar className={classes.avatar}>
                  <StarIcon />
                </Avatar>
              </Box>
              <Box mt={2}>
                <Typography variant="h3" color="textPrimary" align="center">
                  App creation successful!
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  You can now add or invite users and can also integrate the
                  auth module to your existing projects!
                </Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/dashboard"
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProjectCreateView;
