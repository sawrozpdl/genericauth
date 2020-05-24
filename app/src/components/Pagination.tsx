import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme: any) => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const Pagination = (props: any) => {
  const {
    totalPages,
    page,
    isFirst,
    isLast,
    handlePrevious,
    handleNext,
    disabled,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.pagination}>
      <Typography variant="caption">{`Page: ${
        page + 1
      } of ${totalPages}`}</Typography>
      <IconButton disabled={disabled || isFirst} onClick={handlePrevious}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton disabled={disabled || isLast} onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
