import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';
import { changePassword } from '../../../../services/user';
import toast from '../../../../utils/toast';
import { handleError } from '../../../../utils/error';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Password = (props: any) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirm: '',
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (values.confirm !== values.password) {
      return toast.info('Passwords donot match, Please try again');
    }
    if (values.password.length < 8) {
      return toast.info('Password should be at least 8 characters');
    }
    setSubmitting(true);
    try {
      await changePassword(values.password);
      setValues({ password: '', confirm: '' });
      toast.success('Password changed successfully');
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={submitting}
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
