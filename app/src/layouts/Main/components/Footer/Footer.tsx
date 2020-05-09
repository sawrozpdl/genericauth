import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.dark,
  },
}));

const Footer = (props: any) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="https://hamroauth.ml/" target="_blank">
          Hamro Auth‎‎‎‏‏‎ ‎
        </Link>
        ‎2020
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
